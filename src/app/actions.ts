'use server';

import { z } from 'zod';

// ========== НАСТРОЙКИ TELEGRAM ==========
// Получите токен бота у @BotFather в Telegram
// Получите chat_id: отправьте боту сообщение и перейдите по ссылке:
// https://api.telegram.org/bot<TOKEN>/getUpdates
// Можно указать несколько chat_id через запятую: "123456789,987654321"
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_IDS = process.env.TELEGRAM_CHAT_ID
  ? process.env.TELEGRAM_CHAT_ID.split(',').map(id => id.trim()).filter(Boolean)
  : [];

// Схема валидации заявки
const leadSchema = z.object({
  name: z
    .string()
    .min(2, 'Имя должно содержать минимум 2 символа')
    .max(100, 'Имя слишком длинное')
    .trim(),
  phone: z
    .string()
    .regex(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат телефона'),
  comment: z
    .string()
    .max(1000, 'Комментарий слишком длинный')
    .trim()
    .optional()
    .default(''),
});

export type LeadFormData = z.infer<typeof leadSchema>;

export type SubmitLeadResult = 
  | { ok: true; message: string }
  | { ok: false; error: string; fieldErrors?: Record<string, string[]> };

/**
 * Отправка сообщения в Telegram
 */
async function sendToTelegram(data: LeadFormData): Promise<boolean> {
  if (!TELEGRAM_BOT_TOKEN || TELEGRAM_CHAT_IDS.length === 0) {
    console.warn('[Telegram] Токен или chat_id не настроены');
    return false;
  }

  const message = `
🔔 *Новая заявка с сайта*

👤 *Имя:* ${escapeMarkdown(data.name)}
📞 *Телефон:* ${escapeMarkdown(data.phone)}
${data.comment ? `💬 *Комментарий:* ${escapeMarkdown(data.comment)}` : ''}

📅 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}
  `.trim();

  // Отправляем сообщение всем указанным chat_id
  const sendPromises = TELEGRAM_CHAT_IDS.map(async (chatId) => {
    try {
      const response = await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
            parse_mode: 'Markdown',
          }),
        }
      );

      if (!response.ok) {
        const error = await response.text();
        console.error(`[Telegram] Ошибка отправки в chat_id ${chatId}:`, error);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`[Telegram] Ошибка отправки в chat_id ${chatId}:`, error);
      return false;
    }
  });

  const results = await Promise.all(sendPromises);
  // Возвращаем true, если хотя бы одно сообщение отправлено успешно
  return results.some(result => result === true);
}

/**
 * Экранирование спецсимволов для Markdown
 */
function escapeMarkdown(text: string): string {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
}

export async function submitLead(formData: FormData): Promise<SubmitLeadResult> {
  const rawData = {
    name: formData.get('name'),
    phone: formData.get('phone'),
    comment: formData.get('comment') || '',
  };

  // Валидация данных
  const result = leadSchema.safeParse(rawData);

  if (!result.success) {
    const fieldErrors: Record<string, string[]> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      if (!fieldErrors[field]) fieldErrors[field] = [];
      fieldErrors[field].push(issue.message);
    });

    return {
      ok: false,
      error: 'Проверьте правильность заполнения формы',
      fieldErrors,
    };
  }

  const { name, phone, comment } = result.data;

  try {
    // Отправка в Telegram
    const telegramSent = await sendToTelegram({ name, phone, comment });
    
    // Логируем заявку
    console.log('[Lead]', { 
      name, 
      phone, 
      comment, 
      telegramSent,
      timestamp: new Date().toISOString() 
    });

    if (!telegramSent && TELEGRAM_BOT_TOKEN) {
      // Telegram настроен, но отправка не удалась
      return { ok: false, error: 'Не удалось отправить заявку. Попробуйте позже.' };
    }

    return { ok: true, message: 'Заявка успешно отправлена!' };
  } catch (error) {
    console.error('[Lead Error]', error);
    return { ok: false, error: 'Не удалось отправить заявку. Попробуйте позже.' };
  }
}