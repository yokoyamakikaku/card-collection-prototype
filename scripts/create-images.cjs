require('dotenv').config();

const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Command } = require('commander');
const program = new Command();
const { OpenAI } = require('openai');

const etoAnimals = [
  {
    etoName: "Rat",
    generalName: "Rat",
    description: "A small and quick animal with large ears and a long tail.",
  },
  {
    etoName: "Ox",
    generalName: "Ox",
    description: "A powerful animal characterized by its horns, symbolizing strength and the ability to plow fields.",
  },
  {
    etoName: "Tiger",
    generalName: "Tiger",
    description: "A strong and brave animal, known for its stripes and sharp claws.",
  },
  {
    etoName: "Rabbit",
    generalName: "Rabbit",
    description: "An animal with soft fur and long ears, known for its quick hopping.",
  },
  {
    etoName: "Dragon",
    generalName: "Eastern Dragon",
    description: "A mythical creature that flies in the sky, with scales and a long beard, symbolizing mystical power.",
  },
  {
    etoName: "Snake",
    generalName: "Snake",
    description: "An agile animal that moves silently, some species are venomous.",
  },
  {
    etoName: "Horse",
    generalName: "Horse",
    description: "An elegant and fast animal, known for its long mane and tail.",
  },
  {
    etoName: "Sheep",
    generalName: "Sheep",
    description: "An animal covered in soft wool, known for its gentle nature and tendency to flock together.",
  },
  {
    etoName: "Monkey",
    generalName: "Monkey",
    description: "An intelligent animal with dexterous hands, known for its ability to climb trees.",
  },
  {
    etoName: "Rooster",
    generalName: "Rooster",
    description: "An animal that announces the dawn, known for its colorful feathers and strong crow.",
  },
  {
    etoName: "Dog",
    generalName: "Dog",
    description: "A loyal and trustworthy animal, known for its keen sense of smell and loyalty.",
  },
  {
    etoName: "Boar",
    generalName: "Boar",
    description: "A powerful and brave animal, known for its tough fur and charging ability.",
  }
];

function generateEtoImagePrompt(etoAnimal) {
  const style = "a hand-drawn style as if using a magic marker";
  const pose = "facing forward, with the face centered and filling a significant portion of the image";
  const backgroundStyle = "a natural environment where the animal would typically be found, but not too distracting";
  const colorPalette = [
    "#FF0000", // Red
    "#0000FF", // Blue
    "#FFFF00", // Yellow
    "#00FF00", // Green
    "#FFA500", // Orange
    "#800080", // Purple
    "#FFC0CB", // Pink
    "#00FFFF", // Cyan
    "#FF00FF", // Magenta
    "#00FF7F", // Lime
    "#008080", // Teal
    "#4B0082", // Indigo
    "#A52A2A", // Brown
    "#000000", // Black
    "#FFFFFF", // White
    "#808080"  // Gray
  ].join(", ");
  const size = "512x512";
  const resolution = "72 dpi";
  const noText = "Do not include any text in the image.";
  const facePositioning = "Ensure that the face is prominently centered in the image with the head occupying most of the frame";

  const prompt = [
    `Create an image of a ${etoAnimal.generalName} in ${style}.`,
    `The ${etoAnimal.generalName} is characterized by the following: ${etoAnimal.description}.`,
    `The animal should be ${pose}, with ${backgroundStyle}.`,
    `Use only the following 16 vivid colors: ${colorPalette}.`,
    `The image should be ${size} with a resolution of ${resolution}.`,
    `${noText}`,
    `${facePositioning}`
  ].join(' ');

  return prompt;
}


// コマンドラインオプションの設定
program
  .option('-d, --directory <path>', '出力ディレクトリ', './images')
  .parse(process.argv);

const options = program.opts();

async function main() {
  const directory = options.directory;

  // 出力ディレクトリの存在確認と作成
  if (!fs.existsSync(directory)) {
    console.log(`出力ディレクトリ「${directory}」が存在しません。新しく作成します。`);
    fs.mkdirSync(directory, { recursive: true });
    console.log(`ディレクトリ「${directory}」を作成しました。`);
  } else {
    console.log(`出力ディレクトリ「${directory}」は既に存在します。`);
  }

  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  const now = new Date();

  // 各干支に対して画像を生成
  for (const etoAnimal of etoAnimals) {
    const etoName = etoAnimal.etoName;
    try {
      console.log(`干支「${etoName}」の画像生成を開始します。`);

      const image = await openai.images.generate({
        prompt: generateEtoImagePrompt(etoAnimal),
      });

      // 生成された各画像に対して処理を実行
      for (const index in image.data) {
        const data = image.data[index];
        const url = data.url;
        if (typeof url !== "string") {
          console.log(`image.data[${index}]にURLがありません。`);
          continue;
        }

        const imagePath = path.join(directory, `image_${etoName}_${now.getTime()}_${index}.png`);
        const writer = fs.createWriteStream(imagePath);

        const response = await axios({
          url,
          method: 'GET',
          responseType: 'stream',
        });

        response.data.pipe(writer);

        writer.on('finish', () => console.log(`画像 ${index + 1} を「${imagePath}」に保存しました。`));
        writer.on('error', (err) => console.error('画像の保存中にエラーが発生しました:', err));
      }
    } catch (error) {
      console.error(`干支「${etoName}」の画像生成中にエラーが発生しました:`, error);
    }
  }
}

main().then(() => console.log('すべての画像生成が完了しました。')).catch(err => console.error('メイン処理でエラーが発生しました:', err));
