import BoolArgumentType from './BoolArgumentType';
import CommandContext from '../context/CommandContext';
import FloatArgumentType from './FloatArgumentType';
import IntegerArgumentType from './IntegerArgumentType';
import StringArgumentType from './StringArgumentType';
import StringReader from '../StringReader';
import Suggestions from '../suggestion/Suggestions';
import SuggestionsBuilder from '../suggestion/SuggestionsBuilder';

export const DefaultType = {
    bool: BoolArgumentType.bool,
    integer: IntegerArgumentType.integer,
    float: FloatArgumentType.float,
    word: StringArgumentType.word,
    string: StringArgumentType.string,
    greedyString: StringArgumentType.greedyString
};

export default interface ArgumentType<T> {
    parse(reader: StringReader, context: CommandContext<any>): T;

    listSuggestions?<S>(
        context: CommandContext<S>,
        builder: SuggestionsBuilder
    ): Promise<Suggestions>;

    getExamples?(): Iterable<string>;
}
