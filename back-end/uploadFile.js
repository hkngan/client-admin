const { Configuration, OpenAIApi } = require("openai");
const fs = require('fs')

const configuration = new Configuration({
    apiKey: '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',
  });
const openai = new OpenAIApi(configuration);

//run this first then comment out func call
async function upload() {
    try {
        const f = await openai.createFile(
            fs.createReadStream("data.jsonl"),
            "fine-tune"
        );
        console.log(`File ID ${f.data.id}`);
        return f.data.id;
    }
    catch (err) {
        console.log('err uploadfile: ', err);
    } 
  }
  
// upload()

//run this 2nd, wait a bit, then comment out func call and move on
async function makeFineTune() {
    try {
        const ft = await openai.createFineTune({
            training_file: 'file-r5FXYArUGF0H1Tlt2c9Qbryx',
            model: 'davinci'
        });
        console.log(ft);
     }
    catch (err) {
        console.log('err makefinetune: ', err.response.data.error);
    }
}
// makeFineTune()
// 3. run,wait a bit, run again and get fine_tuned_model name
async function listFineTunes() {
    try {
        const modelName = await openai.listFineTunes();
        console.log('data: ', modelName.data.data)
    }
    catch (err) {
        console.log('err getmod: ', err)
    }
 }
  
//   listFineTunes()
// async function deleteFineTune() {
//     try {
//       const response = await openai.deleteModel('curie:ft-personal-2023-03-18-18-02-20')
//       console.log('response: ', response)
//     } catch (err) {
//       console.log('err: ', err)
//     }
//   }
  
//   deleteFineTune()

async function run() {
    try {
        const comp = await openai.createCompletion({
            model: 'davinci:ft-personal-2023-12-04-09-37-37',
            prompt: `Is a Cinemagic theater available in Can Tho now?`,
            max_tokens: 200
        });
        if (comp.data) {
            console.log('choices: ', comp.data.choices)
        }
    } catch (err) {
        console.log('err: ', err)
    }
}
run();

