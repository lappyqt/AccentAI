import { Telegraf, Scenes, session } from "telegraf";
import { accentScene } from "./scenes/accentScene";

const stage = new Scenes.Stage<Scenes.SceneContext>([ accentScene ]);
const bot = new Telegraf<Scenes.SceneContext>(Bun.env.TELEGRAM_TOKEN!);

bot.use(session());
bot.use(stage.middleware());
bot.telegram.setMyCommands([
    {
        command: '/accent',
        description: 'Найти ударение в списке слов'
    }
]);

bot.start(context => {
    context.replyWithAnimation("https://i.pinimg.com/originals/3d/aa/c5/3daac57c1a68599a1c7b300038fb446e.gif", { caption: "Для поиска ударений используй команду: /accent" });
});

bot.command('accent', (context) => {
    context.scene.enter('ACCENT_SCENE');
});

bot.launch();