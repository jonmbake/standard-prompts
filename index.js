const OpenAI = require('openai');

const openai = new OpenAI();

const buildSystemPromptContent = (systemPrompt) => {
  const {identity, purpose, responseConditions, outputFormat} = systemPrompt;
  return `You are ${identity} trained to ${purpose}. Your response should be ${responseConditions}. Structure your response in ${outputFormat}.`;
}

/**
 * Gets user prompt from either {@link process.stdin} or first argument to prompt.
 *
 * @returns Promise resolved to entered user prompt
 */
const getUserPrompt = () => {
  return new Promise((resolve, reject) => {
    let userPrompt = process.argv[2];
    if(userPrompt) {
      return resolve(userPrompt);
    }
    process.stdin.setEncoding('utf8');
    
    process.stdin.on('readable', () => {
      let chunk;
      while ((chunk = process.stdin.read()) !== null) {
        userPrompt += chunk;
      }
    });
    
    setTimeout(() => {
      if (!userPrompt) {
        reject('No user prompt provided.\n');
      }
    }, 1000);
    
    process.stdin.on('end', async () => {
      resolve(userPrompt);
    });
  });
}

module.exports = async function standardPrompt(systemPrompt) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: buildSystemPromptContent(systemPrompt)},
      { role: 'user', content: await getUserPrompt().catch(e =>  process.stderr.write(e) && process.exit(1)) }
    ],
    model: process.env.OPENAI_API_MODEL || 'gpt-4o',
    top_p: 1,
    frequency_penalty: 0.1,
    presence_penalty: 0.1
  });
  process.stdout.write(chatCompletion.choices[0].message.content);
}
