# standard-prompts

Standard AI prompts that can be invoked from the command line. To get started, make sure `node.js` is installed and run:

```
npm install -g standard-prompts
```

_Standard prompts_ uses the [OpenAI API]. Make sure to also set `OPENAI_API_KEY` environment variable (and optionally `OPENAI_API_MODEL`):

```
export OPENAI_API_KEY=<insert-api-key-here>
export OPENAI_API_MODEL=gpt-4
```

If `OPENAI_API_MODEL` env var is not set, _Standard Prompts_ defaults to the `gpt-4` model.

## Usage

Input can be either passed in as an argument to a _standard prompt_ or piped in. For example, both are valid:

```
ai_code_generate "Standard gitignore file for a node.js project"
echo "Standard gitignore file for a node.js project" | ai_code_generate
```

## Philosophy

### Composable

_Standard prompts_ follows the Unix philosophy of being composable. For example, commands can be piped together:

```
cat email-draft.txt | ai_review_email | pbcopy
```

The example commands:
 - Takes an email draft from `email-draft.txt`
 - Pipes it to `ai_review_email` to review the email.
 - Finally, pipes the reviewed email to `pbcopy`, which saves it to the clipboard for pasting into an email.

### Favor Markdown Output

Output is generally given as Markdown.

## Available Standard Prompts

### Email

| Command             | Description                                      |
|---------------------|--------------------------------------------------|
| `ai_email_generate` | Generate an email given passed specifications.   |
| `ai_email_review`   | Reviews and suggests improvements for an email draft.|

### Code

| Command             | Description                                      |
|---------------------|--------------------------------------------------|
| `ai_code_qa`        | Answer questions about code input.               |
| `ai_code_generate`  | Generate code given description input.           |
| `ai_code_review`    | Reviews and suggests improvements for code.      |

### Financial

| Command                | Description                                   |
|------------------------|-----------------------------------------------|
| `ai_financial_qa`      | Answers financial related questions.          |
| `ai_financial_review`  | Reviews financial statements or documents passed as input.|

### Health

| Command              | Description                                     |
|----------------------|-------------------------------------------------|
| `ai_health_qa`       | Answers health related questions.               |
| `ai_health_review`   | Reviews health-related documents passed as input.|

### General 

| Command          | Description                                       |
|------------------|---------------------------------------------------|
| `ai_generate`    | Generates text based on a given input.            |
| `ai_review`      | Reviews a given text input.                       |
| `ai_summarize`   | Summarizes a given text input.                    |

**Tip**: you can summarize this _Readme_ using _Standard Prompts_: `curl -s https://raw.githubusercontent.com/jonmbake/standard-prompts/master/README | ai_summarize`.

