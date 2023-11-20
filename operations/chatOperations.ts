import { post } from './fetch';
import childrenBookDefinition from './function-definitions/childrenBookDefinition';

const DEFAULT_SYSTEM_PROMPT = `You are a genius story writer with incredible ability to craft narratives, stories, and children's books that captivate the imagination and entertain. Make the quality of your writing as excellent as possible (think Dr. Seuss, J.K. Rowling, etc). Feel free to include act structure names/chapters.)`;

const DEFAULT_USER_PROMPT = `Story about the best day ever`;

const generateRequestPayload = (messages: { role: string; content: string }[]) => ({
  model: 'gpt-3.5-turbo',
  messages,
  functions: childrenBookDefinition // Make sure this is correctly imported and structured
});

// TODO(Benson): Type the interface returned from open ai

function getFunctionCallArguments<T>(response: any) {
  return JSON.parse(response.text.function_call.arguments);
}

/*
 TODO(Benson -> Patricio): update this typing? add images to pages? assuming images 
 and pages are 1:1? that means we should probably also have a titleImage property too then?
 Added dummy filler.
 */
export interface IStory {
  title: string;
  // titleImage?: string;
  topic: string;
  introduction: string;
  narrativeStructure: string;
  archetypes_characters: string;
  pages: { text: string }[];
  // pages: { text: string, image?: string }[];
}

async function createStoryAsync(
  systemPrompt = DEFAULT_SYSTEM_PROMPT,
  userPrompt = DEFAULT_USER_PROMPT
): Promise<IStory> {
  const messages = [
    {
      role: 'system',
      content: systemPrompt
    },
    {
      role: 'user',
      content: userPrompt
    }
  ];
  try {
    const data = await post('/api/open-ai/chat', generateRequestPayload(messages));
    return getFunctionCallArguments<IStory>(data);
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export default { createStoryAsync };
