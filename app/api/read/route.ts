import uniqid from 'uniqid';
import fs from 'fs';
import path from 'path';
import { GPTScript, RunEventType } from '@gptscript-ai/gptscript';

export async function POST(req) {
  const { dockerfiles } = await req.json();
  const g = new GPTScript();

  try {
    for (let i = 0; i < dockerfiles.length; i++) {
      const dockerfile = dockerfiles[i];
      const dir = path.join(process.cwd(), 'generated_images');
      const filePath = path.join('/generated_images', `b-roll-${i+1}.png`);

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }

      console.log("dockerfile",dockerfile);

      console.log(`Starting to process Dockerfile ${i + 1}`);


      const opts = {
        disableCache: true,
        variables: {
          dockerfile,
          filePath,
        },
      };

      console.log("yeh opts hai",opts);

      try {
        const result = await g.run(path.join(process.cwd(), 'app', 'api', 'read', 'sequence.gpt'), opts);

        if (result && result.success) {
          console.log(`Image generated and saved to ${filePath}`);
        } else {
          console.error(`Failed to generate image for Dockerfile ${i + 1}:`, result ? result.error : 'No result returned');
        }
      } catch (runError) {
        console.error(`Exception while running GPTScript for Dockerfile ${i + 1}:`, runError);
      }
    }

    return new Response(JSON.stringify({ message: 'Images generated successfully' }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error generating images:', error);
    return new Response(JSON.stringify({ error: 'Failed to generate images' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
