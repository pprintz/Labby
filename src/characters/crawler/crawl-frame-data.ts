import Crawler = require('crawler');
import * as mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { Character } from '../entities/character';
import { getModelForClass } from '@typegoose/typegoose';
import { Move } from '../entities/move';

const result = dotenv.config({ path: 'development.env' });

if (result.error) {
  throw result.error;
}

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  const charModel = getModelForClass(Character);

  // Setup crawler - Setup callbacks
  const c = new Crawler({
    maxConnections: 10,
    rateLimit: 100,
    callback(error, res: Crawler.CrawlerRequestResponse, done) {
      if (error) {
        throw error;
      } else {
        const $: CheerioAPI = res.$;

        const links = $("a:contains('Season 3')");
        $(links).each((_, link) => {
          const href = $(link).attr('href');
          const re = RegExp('http://|rbnorway.org/|/', 'g');

          const cleanedHref = href.replace(re, '');
          const ws = cleanedHref.split('-');
          c.queue({
            uri: 'http://rbnorway.org/t7-frame-data/' + cleanedHref,
            callback: parseMoves,
            name: ws.slice(0, ws.length - 2).join(' '),
            characterModel: charModel,
          });
        });
      }
      done();
    },
  });

  // Start crawling
  c.queue('http://rbnorway.org/t7-frame-data/');
});
function parseMoves(
  err: Error,
  res: Crawler.CrawlerRequestResponse,
  done: () => void,
): void {
  if (err) {
    throw err;
  } else {
    const $ = res.$;
    const tables = $('table');
    const ms = getMovesFromTable($(tables[0]), $);
    const bMs = getMovesFromTable($(tables[1]), $);
    const character: Character = {
      name: res.options.name,
      moves: ms,
      basicMoves: bMs,
    };
    res.options.characterModel.create(character);
    console.log('crawled ->' + res.options.name);
  }
  done();
}
function getMovesFromTable(table: Cheerio, $: CheerioAPI): Move[] {
  const rows = table.find('tr');
  const moves: Move[] = [];
  rows.slice(1).each((_, r) => {
    const cols = $(r).find('td');
    const trimAndSplitText = (c: Cheerio): string[] =>
      c
        .text()
        .split(',')
        .map(s => s.trim());

    const move: Move = {
      command: trimAndSplitText($(cols[0])),
      hitLevel: trimAndSplitText($(cols[1])),
      damage: trimAndSplitText($(cols[2])).map(s => (isNaN(+s) ? 0 : +s)),
      startUpFrame: trimAndSplitText($(cols[3])),
      blockFrame: $(cols[4])
        .text()
        .trim(),
      hitFrame: $(cols[5])
        .text()
        .trim(),
      chFrame: $(cols[6])
        .text()
        .trim(),
      notes: trimAndSplitText($(cols[7])),
    };
    moves.push(move);
  });
  return moves;
}
