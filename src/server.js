import TelegramBot from "node-telegram-bot-api";
import { config } from "dotenv";
config();
const Api = process.env.TOKEN;
const bot = new TelegramBot(Api, {
  polling: true,
});
const admin = 865706383;
let users = {};
let step = 0;
let language = "🇺🇿";
let change;

bot.onText(/\/start/, (msg) => {
  step = 0;

  const { id } = msg.chat;
  users[id] = {};
  bot.sendMessage(
    msg.chat.id,
    `🇺🇿 Tilni tanlang: \n🇷🇺 Выберите язык: \n🇬🇧 Select a language:`,
    {
      reply_markup: {
        keyboard: [[{ text: "🇺🇿" }, { text: "🇷🇺" }, { text: "🇬🇧" }]],
        resize_keyboard: true,
        one_time_keyboard: true,
      },
    }
  );
});

bot.on("message", async (msg) => {
  try {
    const chatId = msg.chat.id;
    if (
      msg.text === "🔙 Ortga qaytish" ||
      msg.text === "🔙 Возвращаться" ||
      msg.text === "🔙 Go back"
    ) {
      if (step === 3) {
        if (language == "🇺🇿") {
          await bot.sendMessage(chatId, `Asosiy sahifa`, {
            reply_markup: {
              keyboard: [
                [{ text: "Sotib olish ✅" }, { text: "📞 Aloqa" }],
                [{ text: "Biz haqimizda 📌" }],
              ],
              resize_keyboard: true,
            },
          });
        } else if (language == "🇷🇺") {
          await bot.sendMessage(chatId, `Главное меню`, {
            reply_markup: {
              keyboard: [
                [{ text: "Покупка ✅" }, { text: "📞 Контакт" }],
                [{ text: "O нас 📌" }],
              ],
              resize_keyboard: true,
            },
          });
        } else if (language == "🇬🇧") {
          await bot.sendMessage(chatId, `Main menu`, {
            reply_markup: {
              keyboard: [
                [{ text: "Purchase ✅" }, { text: "📞 Contact" }],
                [{ text: "About us 📌" }],
              ],
              resize_keyboard: true,
            },
          });
        }
      } else {
        step = step - 2;
      }
    } else if (
      msg.text === "🔝 Bosh sahifa" ||
      msg.text === "🔝 Главное меню" ||
      msg.text === "🔝 Main menu"
    ) {
      step = 3;
    }

    if (["🇺🇿", "🇷🇺", "🇬🇧"].includes(msg.text)) {
      users[chatId] = { language: msg.text };
      language = users[chatId].language;
      step++;
      if (language == "🇺🇿") {
        await bot.sendMessage(
          chatId,
          `Assalomu alaykum ${msg.from.first_name}! \n<b>«Yangi Yo'l textile»</b> botiga xush kelibsiz!😊`,
          { parse_mode: "HTML" }
        );
        await bot.sendMessage(
          chatId,
          "Ismingizni kiriting! \nFormat: <b>Davlat Davlatov</b>",
          { parse_mode: "HTML" }
        );
      } else if (language == "🇷🇺") {
        await bot.sendMessage(
          chatId,
          `Здраствуйте ${msg.from.first_name}! \nДобро пожаловать в бот <b>«Yangi Yo'l textile»</b>!😊`,
          { parse_mode: "HTML" }
        );
        await bot.sendMessage(
          chatId,
          "Введите ваше имя! \nФормат: <b>Александр Александров</b>",
          { parse_mode: "HTML" }
        );
      } else if (language == "🇬🇧") {
        await bot.sendMessage(
          chatId,
          `Hello ${msg.from.first_name}! \nWelcome to the <b>«Yangi Yo'l textile»</b> bot!😊`,
          { parse_mode: "HTML" }
        );
        await bot.sendMessage(chatId, "Enter your name! \nFormat: John Doe");
      }
    } else if (step === 1) {
      step++;
      users[chatId].username = msg.text;
      if (language == "🇺🇿") {
        await bot.sendMessage(
          chatId,
          `Hurmatli ${msg.text}😊! \nIltimos contactni ulashish tugmasini bosing!`,
          {
            reply_markup: {
              keyboard: [[{ text: "📲", request_contact: true }]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          }
        );
      } else if (language == "🇷🇺") {
        await bot.sendMessage(
          chatId,
          `Уважаемый ${msg.text}😊! \nПожалуйста, нажмите кнопку «Поделиться контактами»!`,
          {
            reply_markup: {
              keyboard: [[{ text: "📲", request_contact: true }]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          }
        );
      } else if (language == "🇬🇧") {
        await bot.sendMessage(
          chatId,
          `Dear ${msg.text}😊! \nPlease, click the share contact button!`,
          {
            reply_markup: {
              keyboard: [[{ text: "📲", request_contact: true }]],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          }
        );
      }
    } else if (step === 3) {
      if (
        (msg.text.length == 9 && !isNaN(+msg.text)) ||
        msg.text == "🔙 Ortga qaytish" ||
        msg.text == "🔙 Возвращаться" ||
        msg.text == "🔙 Go back" ||
        msg.text == "🔝 Bosh sahifa" ||
        msg.text == "🔝 Главное меню" ||
        msg.text == "🔝 Main menu"
      ) {
        step++;
        msg.text.length == 9 && !isNaN(+msg.text)
          ? (users[chatId].inn = msg.text)
          : "";
        if (language == "🇺🇿") {
          await bot.sendMessage(chatId, `Asosiy sahifa`, {
            reply_markup: {
              keyboard: [
                [{ text: "Sotib olish ✅" }, { text: "📞 Aloqa" }],
                [{ text: "Biz haqimizda 📌" }, { text: "Mening profilim" }],
              ],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          });
        } else if (language == "🇷🇺") {
          await bot.sendMessage(chatId, `Главное меню`, {
            reply_markup: {
              keyboard: [
                [{ text: "Покупка ✅" }, { text: "📞 Контакт" }],
                [{ text: "O нас 📌" }, { text: "Мой профайл" }],
              ],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          });
        } else if (language == "🇬🇧") {
          await bot.sendMessage(chatId, `Main menu`, {
            reply_markup: {
              keyboard: [
                [{ text: "Purchase ✅" }, { text: "📞 Contact" }],
                [{ text: "About us 📌" }, { text: "My Profile" }],
              ],
              resize_keyboard: true,
              one_time_keyboard: true,
            },
          });
        }
      } else {
        if (language == "🇺🇿") {
          await bot.sendMessage(
            chatId,
            `Noto'g'ri INN raqami! \nIltimos qayta urinib ko'ring!`
          );
        } else if (language == "🇷🇺") {
          await bot.sendMessage(
            chatId,
            `Неверный номер ИНН! \nПожалуйста, попробуйте еще раз!`
          );
        } else if (language == "🇬🇧") {
          await bot.sendMessage(
            chatId,
            `Invalid INN number! \nPlease try again!`
          );
        }
      }
    } else if(msg.text == "Mening profilim" && step == 4) {
       if(language == "🇺🇿"){
        await bot.sendMessage(
          chatId,
          `Ism: ${users[chatId].username}\nKontakt: ${users[chatId].contact}\nINN raqami: ${users[chatId].inn}`,
          {
            reply_markup: {
              keyboard: [[{ text: "Tahrirlash" }, { text: "🔝 Bosh sahifa" }]],
              resize_keyboard: true,
            },
          }
          );
        }
        step = 20;
     }else if(msg.text == "Мой профайл" && step == 4) {
      if(language == "🇷🇺"){
       await bot.sendMessage(
         chatId,
         `Имя: ${users[chatId].username}\nКонтакт: ${users[chatId].contact}\nИНН номер: ${users[chatId].inn}`,
         {
           reply_markup: {
             keyboard: [[{ text: "Редактирование" }, { text: "🔝 Главное меню"}]],
             resize_keyboard: true,
           },
         }
         );
       }
       step = 20;
    }else if(msg.text == "My Profile" && step == 4) {
      if(language == "🇬🇧"){
       await bot.sendMessage(
         chatId,
         `Name: ${users[chatId].username}\nContact: ${users[chatId].contact}\nINN number: ${users[chatId].inn}`,
         {
           reply_markup: {
             keyboard: [[{ text: "Editing" }, { text: "🔝 Main menu"}]],
             resize_keyboard: true,
           },
         }
         );
       }
       step = 20;
    }

    else if (
      (step == 20 && msg.text == "Tahrirlash") ||
      (step == 20 && msg.text == "🔙 Ortga qaytish")||
      (step == 20 && msg.text == "Редактирование")||
      (step == 20 && msg.text == "🔙 Возвращаться")||
      (step == 20 && msg.text == "Editing")||
      (step == 20 && msg.text == "🔙 Go back")
    ) {
      step++;
     if(language == "🇺🇿"){
      await bot.sendMessage(
        chatId,
        `Qaysi qismga o'zgartirish kiritmoqchisiz?`,
        {
          reply_markup: {
            keyboard: [
              [{ text: "Ism" }, { text: "Kontakt" }],
              [{ text: "INN raqam" }, { text: "🔝 Bosh sahifa" }],
            ],
            resize_keyboard: true,
          },
        }
      );
     }else if (language == "🇷🇺"){
      await bot.sendMessage(
        chatId,
        `Какую часть вы хотите изменить?`,
        {
          reply_markup: {
            keyboard: [
              [{ text: "Имя" }, { text: "Контакт" }],
              [{ text: "ИНН номер" }, { text: "🔝 Главное меню" }],
            ],
            resize_keyboard: true,
          },
        }
      );
     }else if (language == "🇬🇧"){
      await bot.sendMessage(
        chatId,
        `Which part do you want to change?`,
        {
          reply_markup: {
            keyboard: [
              [{ text: "Name" }, { text: "Contact" }],
              [{ text: "INN number" }, { text: "🔝 Main menu" }],
            ],
            resize_keyboard: true,
          },
        }
      );
     }
    } else if (
      (step == 21 && ["Kontakt", "Ism", "INN raqam"].includes(msg.text)) ||
      (step == 21 && msg.text == "🔙 Ortga qaytish")||
      (step == 21 && ["Контакт", "Имя", "ИНН номер"].includes(msg.text)) ||
      (step == 21 && msg.text == "🔙 Возвращаться")||
      (step == 21 && ["Contact", "Name", "INN number"].includes(msg.text)) ||
      (step == 21 && msg.text == "🔙 Go back")
    ) {
      step++;
      ["Kontakt", "Ism", "INN raqam"].includes(msg.text)
        ? (change = { text: msg.text })
        : "";
      ["Контакт", "Имя", "ИНН номер"].includes(msg.text)
        ? (change = { text: msg.text })
        : "";
      ["Contact", "Name", "INN number"].includes(msg.text)
        ? (change = { text: msg.text })
        : "";
      if(language == "🇺🇿"){
        await bot.sendMessage(
          chatId,
          `Yangi ${change.text.toLocaleLowerCase()}ni kiriting.\nFormat: ${
            change.text == "Kontakt"
              ? "+998937444463"
              : change.text == "INN raqam"
              ? "123456789"
              : "Davlat Davlatov"
          }`,
          {
            reply_markup: {
              keyboard: [[{ text: "🔙 Ortga qaytish" }]],
              resize_keyboard: true,
            },
          }
        );
      }else if(language == "🇷🇺"){
        await bot.sendMessage(
          chatId,
          `новый ${change.text.toLocaleLowerCase()}входить\nФормат: ${
            change.text == "Контакт"
              ? "+9989937444463"
              : change.text == "ИНН номер"
              ? "123456789"
              : "Александр Александров"
          }`,
          {
            reply_markup: {
              keyboard: [[{ text: "🔙 Возвращаться" }]],
              resize_keyboard: true,
            },
          }
        );
      }else if (language == "🇬🇧"){
        await bot.sendMessage(
          chatId,
          `New ${change.text.toLocaleLowerCase()}enter.\nFormat: ${
            change.text == "Contact"
              ? "+998937444463"
              : change.text == "INN number"
              ? "123456789"
              : "John Doe"
          }`,
          {
            reply_markup: {
              keyboard: [[{ text: "🔙 Go back" }]],
              resize_keyboard: true,
            },
          }
        );
      }
    } else if (step == 22) {
      if(language == "🇺🇿"){
        if (change.text === "INN raqam") {
          if (msg.text.length == 9 && !isNaN(+msg.text)) {
            users[chatId].inn = msg.text;
            step++;
            await bot.sendMessage(chatId, "Muvaffaqqiyatli o'zgartitrildi!", {
              reply_markup: {
                keyboard: [
                  [{ text: "🔝 Bosh sahifa" }, { text: "🔙 Ortga qaytish" }],
                ],
                resize_keyboard: true,
              },
            });
          } else {
            await bot.sendMessage(
              chatId,
              `Noto'g'ri ${change.text}\nQayta urining!`
            );
          }
        }
      }else if (language == "🇷🇺") {
        if (change.text === "ИНН номер") {
          if (msg.text.length == 9 && !isNaN(+msg.text)) {
            users[chatId].inn = msg.text;
            step++;
            await bot.sendMessage(chatId, "Конвертировано успешно!", {
              reply_markup: {
                keyboard: [
                  [{ text: "🔝 Главное меню" }, { text: "🔙 Возвращаться" }],
                ],
                resize_keyboard: true,
              },
            });
          } else {
            await bot.sendMessage(
              chatId,
              `Неправильный ${change.text}\nУдарь еще раз!`
            );
          }
        }
      }else if (language == "🇬🇧"){
        if (change.text === "INN number") {
          if (msg.text.length == 9 && !isNaN(+msg.text)) {
            users[chatId].inn = msg.text;
            step++;
            await bot.sendMessage(chatId, "Changed successfully!", {
              reply_markup: {
                keyboard: [
                  [{ text: "🔝 Main menu" }, { text: "🔙 Go back" }],
                ],
                resize_keyboard: true,
              },
            });
          } else {
            await bot.sendMessage(
              chatId,
              `Wrong${change.text}\nStrike again!`
            );
          }
        }
      }
      if (language == "🇺🇿"){
         if (change.text === "Kontakt") {
          if (/^\+(7|86|998)\d{1,4}/.test(msg.text)) {
            users[chatId].contact = msg.text;
            step++;
  
            await bot.sendMessage(chatId, "Muvaffaqqiyatli o'zgartitrildi!", {
              reply_markup: {
                keyboard: [
                  [{ text: "🔝 Bosh sahifa" }, { text: "🔙 Ortga qaytish" }],
                ],
                resize_keyboard: true,
              },
            });
          } else {
            await bot.sendMessage(
              chatId,
              `Noto'g'ri ${change.text}\nQayta urining!`
            );
          }
        }
      } else if(language == "🇷🇺"){
        if (change.text === "Контакт") {
          if (/^\+(7|86|998)\d{1,4}/.test(msg.text)) {
            users[chatId].contact = msg.text;
            step++;
  
            await bot.sendMessage(chatId, "Конвертировано успешно!", {
              reply_markup: {
                keyboard: [
                  [{ text: "🔝 Главное меню" }, { text: "🔙 Возвращаться" }],
                ],
                resize_keyboard: true,
              },
            });
          } else {
            await bot.sendMessage(
              chatId,
              `Неправильный ${change.text}\nУдарь еще раз!`
            );
          }
        }
      }else if (language == "🇬🇧"){
        if (change.text === "Contact") {
          if (/^\+(7|86|998)\d{1,4}/.test(msg.text)) {
            users[chatId].contact = msg.text;
            step++;
  
            await bot.sendMessage(chatId, "Converted successfully!", {
              reply_markup: {
                keyboard: [
                  [{ text: "🔝 Main menu" }, { text: "🔙 Go back" }],
                ],
                resize_keyboard: true,
              },
            });
          } else {
            await bot.sendMessage(
              chatId,
              `Wrong ${change.text}\nStrike again!`
            );
          }
        }
      }
       if (language == "🇺🇿"){
        if("") {
          users[chatId].username = msg.text;
          await bot.sendMessage(chatId, "Muvaffaqqiyatli o'zgartitrildi!", {
            reply_markup: {
              keyboard: [
                [{ text: "🔝 Bosh sahifa" }, { text: "🔙 Ortga qaytish" }],
              ],
              resize_keyboard: true,
            },
          });
        }
       }else if (language == "🇷🇺"){
        if ("") {
          users[chatId].username = msg.text;
          await bot.sendMessage(chatId, "Конвертировано успешно!", {
            reply_markup: {
              keyboard: [
                [{ text: "🔝 Главное меню" }, { text: "🔙 Возвращаться" }],
              ],
              resize_keyboard: true,
            },
          });
        }
       } else if (language == "🇬🇧"){
        if ("") {
          users[chatId].username = msg.text;
          await bot.sendMessage(chatId, "Converted successfully!", {
            reply_markup: {
              keyboard: [
                [{ text: "🔝  Main menu" }, { text: "🔙 Go back" }],
              ],
              resize_keyboard: true,
            },
          });
        }
       }

    } else if (
      (step === 4 && msg.text === "Sotib olish ✅") ||
      (step === 4 && msg.text == "🔙 Ortga qaytish") ||
      (step === 4 && msg.text === "Покупка ✅") ||
      (step === 4 && msg.text == "🔙 Возвращаться") ||
      (step === 4 && msg.text === "Purchase ✅") ||
      (step === 4 && msg.text == "🔙 Go back")
    ) {
      if (language == "🇺🇿") {
        await bot.sendMessage(msg.chat.id, "Kerakli ip o'lchamini tanlang!", {
          reply_markup: {
            keyboard: [
              [{ text: "20/1" }, { text: "24/1" }, { text: "30/1" }],
              [{ text: "🔙 Ortga qaytish" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      } else if (language == "🇷🇺") {
        await bot.sendMessage(msg.chat.id, "Выберите желаемый размер резьбы!", {
          reply_markup: {
            keyboard: [
              [{ text: "20/1" }, { text: "24/1" }, { text: "30/1" }],
              [{ text: "🔙 Возвращаться" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      } else if (language == "🇬🇧") {
        await bot.sendMessage(msg.chat.id, "Choose the desired thread size!", {
          reply_markup: {
            keyboard: [
              [{ text: "20/1" }, { text: "24/1" }, { text: "30/1" }],
              [{ text: "🔙 Go back" }],
            ],
            resize_keyboard: true,
            one_time_keyboard: true,
          },
        });
      }
      step++;
    } else if (step === 4 && msg.text === "📞 Aloqa") {
      await bot.sendMessage(
        chatId,
        "Biz bilan bog'lanish uchun: \n📞 +998931636006"
      );
    } else if (step === 4 && msg.text === "📞 Контакт") {
      await bot.sendMessage(
        chatId,
        "Чтобы связаться с нами: \n📞 +998931636006"
      );
    } else if (step === 4 && msg.text === "📞 Contact") {
      await bot.sendMessage(chatId, "To contact us: \n📞 +998931636006");
    } else if (step === 4 && msg.text === "Biz haqimizda 📌") {
      await bot.sendMediaGroup(chatId, [
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/home_1.jpg",
        },
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/home_2.jpg",
        },
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/img3547.jpg",
        },
      ]);
      await bot.sendMessage(
        chatId,
        `«Yangi Yo'l tekstil» masʼuliyati cheklangan jamiyati Oʻzbekiston bozoridagi yirik ip-kalava ishlab chiqaruvchi korxonalardan biridir. \nZamonaviy texnologik, qurilish-montaj me’yorlariga javob beradigan to‘qimachilik majmuasi 2019-yildan buyon faoliyat yuritib kelmoqda. \n«Karde» yigiruv fabrikasining ishlab chiqarish quvvati yiliga 7200 tonna trikotaj jun ishlab chiqarishni tashkil etadi.`
      );
    } else if (step === 4 && msg.text === "O нас 📌") {
      await bot.sendMediaGroup(chatId, [
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/home_1.jpg",
        },
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/home_2.jpg",
        },
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/img3547.jpg",
        },
      ]);

      await bot.sendMessage(
        chatId,
        `Общество с ограниченной ответственностью «Янги Ел текстиль» является одним из крупнейших предприятий по производству пряжи на рынке Узбекистана. \nТекстильный комплекс, соответствующий современным технологическим, строительным и монтажным стандартам, работает с 2019 года. \nПроизводственная мощность прядильной фабрики «Карде» составляет 7200 тонн трикотажной шерсти в год.`
      );
    } else if (step === 4 && msg.text === "About us 📌") {
      await bot.sendMediaGroup(chatId, [
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/home_1.jpg",
        },
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/home_2.jpg",
        },
        {
          type: "photo",
          media:
            "https://yangiyoltekstil.uz/ru/wp-content/uploads/sites/2/2019/08/img3547.jpg",
        },
      ]);

      await bot.sendMessage(
        chatId,
        `«Yangi Yol textile» limited liability company is one of the largest yarn-producing enterprises in the market of Uzbekistan. \nThe textile complex, which meets modern technological, construction and assembly standards, has been operating since 2019. \nThe production capacity of the «Karde» spinning factory is 7200 tons of knitted wool per year.`
      );
    } else if (
      (step === 5 && ["20/1", "24/1", "30/1"].includes(msg.text)) ||
      (step === 5 && msg.text == "🔙 Ortga qaytish") ||
      (step === 5 && ["20/1", "24/1", "30/1"].includes(msg.text)) ||
      (step === 5 && msg.text == "🔙 Возвращаться") ||
      (step === 5 && ["20/1", "24/1", "30/1"].includes(msg.text)) ||
      (step === 5 && msg.text == "🔙 Go back")
    ) {
      let size = msg.text;
      step++;
      users[chatId].order = {
        size: size,
      };
      if (size == "20/1") {
        if (language == "🇺🇿") {
          await bot.sendPhoto(chatId, 'https://cpimg.tistatic.com/08646304/b/4/TFO-Cotton-Yarn.jpg', {
         caption: `0-10 tonna: $2.65 + NDC\n11-50 tonna: $2.63 + NDC\n51-♾️ tonna: $2.60 + NDC`,
          });

          await bot.sendMessage(
            chatId,
            "Kerakli mahsulot og'irligini kiriting (tonnada)!",
            
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Ortga qaytish" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }    else if (language == "🇷🇺") {
          await bot.sendPhoto(chatId, 'https://cpimg.tistatic.com/08646304/b/4/TFO-Cotton-Yarn.jpg', {
         caption: `0-10 тонны: $2.65 + НДС \n11-50 тонны: $2.63 + НДС \n51-♾️ тонны: $2.60 + НДС`,
          });
          await bot.sendMessage(
            chatId,
            `Введите необходимый вес товара (в тоннах)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Возвращаться" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇬🇧") {
          await bot.sendPhoto(chatId, 'https://cpimg.tistatic.com/08646304/b/4/TFO-Cotton-Yarn.jpg', {
         caption: `0-10 tons: $2.65 + NDC \n11-50 tons: $2.63 + NDC \n51-♾️ tons: $2.60 + NDC`,
          });
          await bot.sendMessage(
            chatId,
            `Enter the required product weight (in tons)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Go back" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      }
      if (size == "24/1") {
        if (language == "🇺🇿") {
          await bot.sendPhoto(chatId, 'https://5.imimg.com/data5/SELLER/Default/2022/11/QP/KI/QW/62771344/combed-cotton-yarn-500x500.jpg', {
         caption: `0-10 tonna: $2.70 + NDC \n11-50 tonna: $2.68 + NDC \n51-♾️ tonna: $2.65 + NDC`,
          });
           
          await bot.sendMessage(
            chatId,
            `Kerakli mahsulot og'irligini kiriting (tonnada)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Ortga qaytish" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇷🇺") {
          await bot.sendPhoto(chatId, 'https://5.imimg.com/data5/SELLER/Default/2022/11/QP/KI/QW/62771344/combed-cotton-yarn-500x500.jpg', {
            caption: `0-10 тонны: $2.70 + НДС \n11-50 тонны: $2.68 + НДС \n51-♾️ тонны: $2.65 + НДС`,
             });
          await bot.sendMessage(
            chatId,
            `Введите необходимый вес товара (в тоннах)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Возвращаться" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇬🇧") {
          await bot.sendPhoto(chatId, 'https://5.imimg.com/data5/SELLER/Default/2022/11/QP/KI/QW/62771344/combed-cotton-yarn-500x500.jpg', {
            caption: `0-10 tons: $2.70 + NDC \n11-50 tons: $2.68 + NDC \n51-♾️ tons: $2.65 + NDC`,
             });
          await bot.sendMessage(
            chatId,
            `Enter the required product weight (in tons)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Go back" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      }

      if (size == "30/1") {
        if (language == "🇺🇿") {
          await bot.sendPhoto(chatId, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PPzkMmSESnLNCTuSc81M9vfidxHqixfucw&usqp=CAU', {
            caption: `0-10 tonna: $2.75 + NDC \n11-50 tonna: $2.73 + NDC \n51-♾️ tonna: $2.70 + NDC`,
             });
          await bot.sendMessage(
            msg.chat.id,
            `Kerakli mahsulot og'irligini kiriting (tonnada)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Ortga qaytish" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇷🇺") {
          await bot.sendPhoto(chatId, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PPzkMmSESnLNCTuSc81M9vfidxHqixfucw&usqp=CAU', {
            caption: `0-10 тонны: $2.75 + НДС \n11-50 тонны: $2.73 + НДС \n51-♾️ тонны: $2.70 + НДС`,
             });
          await bot.sendMessage(
            chatId,
            `Введите необходимый вес товара (в тоннах)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Возвращаться" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇬🇧") {
          await bot.sendPhoto(chatId, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8PPzkMmSESnLNCTuSc81M9vfidxHqixfucw&usqp=CAU', {
            caption: `0-10 тонны: $2.75 + НДС \n11-50 тонны: $2.73 + НДС \n51-♾️ тонны: $2.70 + НДС`,
             });
          await bot.sendMessage(
            msg.chat.id,
            `Enter the required product weight (in tons)!`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔙 Go back" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      }
   
    } else if (step === 6) {
      let weight = +msg.text;
      if (!isNaN(weight)) {
        step++;
        let price;
        let { size } = users[chatId].order;
        users[chatId]["order"]["weight"] = weight;
        if (size === "20/1") {
          if (weight >= 0 && weight < 10) {
            price = "$2.65 + НДС";
          } else if (weight > 10 && weight < 50) {
            price = "$2.63 + НДС";
          } else if (weight >= 50 && weight <= 100000000) {
            price = "$2.60 + НДС";
          }
        } else if (size === "24/1") {
          if (weight >= 0 && weight < 10) {
            price = "$2.70 + НДС";
          } else if (weight >= 10 && weight < 50) {
            price = "$2.68 + НДС";
          } else if (weight >= 50 && weight <= 100000000) {
            price = "$2.65 + НДС";
          }
        } else if (size === "30/1") {
          if (weight >= 0 && weight < 10) {
            price = "$2.75 + НДС";
          } else if (weight >= 10 && weight < 50) {
            price = "$2.73 + НДС";
          } else if (weight >= 50 && weight <= 100000000) {
            price = "$2.70 + НДС";
          }
        }
        users[chatId].order.price = price;
        if (language == "🇺🇿") {
          await bot.sendMessage(
            chatId,
            `Tanlangan mahsulot o'lchami: ${size} \nOg'irligi: ${weight} tonna \nNarxi: ${price}`
          );
        } else if (language == "🇷🇺") {
          await bot.sendMessage(
            chatId,
            `Выбранный размер товара: ${size} \nМасса: ${weight} тонна \nЦена: ${price}`
          );
        } else if (language == "🇬🇧") {
          await bot.sendMessage(
            chatId,
            `Selected product size: ${size} \nWeight: ${weight} tons \nPrice: ${price}`
          );
        }
        if (language == "🇺🇿") {
          await bot.sendMessage(
            chatId,
            `Ushbu kiritilgan ma'lumotlar to'g'ri ekanligiga ishonchingiz komilmi?`,
            {
              reply_markup: {
                keyboard: [[{ text: "Ha" }, { text: "🔙 Ortga qaytish" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇷🇺") {
          await bot.sendMessage(
            chatId,
            `Вы уверены, что введенная вами информация верна?`,
            {
              reply_markup: {
                keyboard: [[{ text: "Да" }, { text: "🔙 Возвращаться" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        } else if (language == "🇬🇧") {
          await bot.sendMessage(
            chatId,
            `Are you sure the information you entered is correct?`,
            {
              reply_markup: {
                keyboard: [[{ text: "Yes" }, { text: "🔙 Go back" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      } else {
        if (language == "🇺🇿") {
          await bot.sendMessage(
            chatId,
            "Noto'g'ri ma'lumot kiritildi! \nQayta urinib ko'ring!"
          );
        } else if (language == "🇷🇺") {
          await bot.sendMessage(
            chatId,
            "Введена неверная информация! \nПопробуйте еще раз!"
          );
        } else if (language == "🇬🇧") {
          await bot.sendMessage(
            chatId,
            "Invalid information entered! \nTry again!"
          );
        }
      }
    } else if (step == 7) {
      if (language == "🇺🇿") {
        if (msg.text == "Ha") {
          const chatId = msg.chat.id;
          await bot.sendMessage(
            chatId,
            "Buyurtma berish uchun «Buyurtma berish ✅» tugmasini bosing!",
            {
              reply_markup: {
                keyboard: [
                  [
                    { text: "Buyurtma berish ✅" },
                    { text: "🔙 Ortga qaytish" },
                  ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      } else if (language == "🇷🇺") {
        if (msg.text == "Да") {
          const chatId = msg.chat.id;
          await bot.sendMessage(
            chatId,
            "Для оформления заказа нажмите кнопку «Разместить заказ ✅»!",
            {
              reply_markup: {
                keyboard: [
                  [
                    { text: "Разместить заказ ✅" },
                    { text: "🔙 Возвращаться" },
                  ],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      } else if (language == "🇬🇧") {
        if (msg.text == "Yes") {
          const chatId = msg.chat.id;
          await bot.sendMessage(
            chatId,
            "To place an order, click the «Place an order ✅» button!",
            {
              reply_markup: {
                keyboard: [
                  [{ text: "Place an order ✅" }, { text: "🔙 Go back" }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      }
      step++;
    } else if (step == 8) {
      if (language == "🇺🇿") {
        if (msg.text == "Buyurtma berish ✅") {
          await bot.sendMessage(
            chatId,
            `Hurmatli ${users[chatId].username}! Buyurtmangiz qabul qilindi! \nSiz bilan tez orada bog'lanamiz😊`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔝 Bosh sahifa" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      } else if (language == "🇷🇺") {
        if (msg.text == "Разместить заказ ✅") {
          await bot.sendMessage(
            chatId,
            `Уважаемый ${users[chatId].username}! Ваш заказ принят! \nМы свяжемся с вами в ближайшее время😊`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔝 Главное меню" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      } else if (language == "🇬🇧") {
        if (msg.text == "Place an order ✅") {
          await bot.sendMessage(
            chatId,
            `Respected ${users[chatId].username}! Your order has been accepted! \nWe will contact you shortly😊`,
            {
              reply_markup: {
                keyboard: [[{ text: "🔝 Main menu" }]],
                resize_keyboard: true,
                one_time_keyboard: true,
              },
            }
          );
        }
      }
      if (language == "🇺🇿") {
        await bot.sendMessage(
          admin,
          `Mijoz ismi: ${users[chatId].username},\nTelegram: @${users[chatId].link},\nTelefon raqami: ${users[chatId].contact},\n Companiya INN : ${users[chatId].inn},\n Narxi : ${users[chatId].order.price},\n Yuk ogirligi : ${users[chatId].order.weight}t,\n Ip olchami : ${users[chatId].order.size}`
        );
      } else if (language == "🇷🇺") {
        await bot.sendMessage(
          admin,
          `Имя Клиента: ${users[chatId].username},\nTelegram: @${users[chatId].link},\nНомер телефона: ${users[chatId].contact},\n Компания ИНН: ${users[chatId].inn},\n Расходы : ${users[chatId].order.price},\n Вес нагрузки : ${users[chatId].order.weight}т,\n Размер нити : ${users[chatId].order.size}`
        );
      } else if (language == "🇬🇧") {
        await bot.sendMessage(
          admin,
          `Customer name: ${users[chatId].username},\n Telegram: @${users[chatId].link},\nPhone number: ${users[chatId].contact},\n Company INN : ${users[chatId].inn},\nCost : ${users[chatId].order.price},\nLoad weight : ${users[chatId].order.weight}t,\n Thread size : ${users[chatId].order.size}`
        );
      }
      step = 3;
    }
  } catch (e) {
    console.log(e.message);
  }
});

bot.on("contact", async (msg) => {
  try {
    const { id } = msg.chat;
    const link = msg.from.username;
    const { phone_number } = msg.contact;
    users[id]["contact"] = phone_number;
    users[id]["link"] = link;
  
    if (language == "🇺🇿") {
      await bot.sendMessage(id, "Kompaniyangizning INN raqamini kiriting!" ,
    
      );
      
      step++;
    } else if (language == "🇷🇺") {
      await bot.sendMessage(id, "Введите ИНН вашей компании!" ,
     
      );
      step++;
    } else if (language == "🇬🇧") {
      await bot.sendMessage(id, "Enter the INN number of your company!",
     
      );
      step++;
    }
  } catch (error) {
    console.log(error.message);
  }
});
