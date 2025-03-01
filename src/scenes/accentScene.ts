import { Scenes } from "telegraf";
import { wordAccentService } from "../services/wordAccentService";

export const accentScene = new Scenes.BaseScene<Scenes.SceneContext>('ACCENT_SCENE');

accentScene.enter(context => context.reply('Отправь список слов (без запятых и нумерации)'));
accentScene.on('message', async context => {
    const words: string[] = context.message['text'].split('\n');
    const replyMessage = await context.reply('Ищу 🩶');

    let message: string = '';

    for (let i = 0; i < words.length; i++) {
        const accent = await wordAccentService.getAccent(words[i]);

        await new Promise(async resolve => {
            message = message.concat(`(${i + 1}) ${accent}\n`)
            await context.telegram.editMessageText(context.chat.id, replyMessage.message_id, '', message, { parse_mode: 'Markdown' });
            resolve(true);
        });
    }

    context.scene.leave();
});