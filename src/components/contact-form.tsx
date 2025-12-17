"use client";

import { useState, useTransition, useRef, useCallback } from "react";
import { submitLead, type SubmitLeadResult } from "@/app/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { InputMask } from "@react-input/mask";
import { CheckCircle, AlertCircle, Loader2 } from "lucide-react";

type FormStatus = 'idle' | 'success' | 'error';

export function ContactForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});
  const [isPending, startTransition] = useTransition();
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  // Полный номер = 18 символов: "+7 (999) 999-99-99"
  const isPhoneValid = phone.replace(/_/g, "").length === 18;
  const isNameValid = name.trim().length >= 2;
  const canSubmit = isPhoneValid && isNameValid && !isPending;

  // Сброс формы
  const resetForm = useCallback(() => {
    setPhone("");
    setName("");
    setFieldErrors({});
    setErrorMessage("");
    formRef.current?.reset();
  }, []);

  // Автообработка вставки номера
  const handlePaste = useCallback((e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    let pasted = e.clipboardData.getData("Text").replace(/\D/g, "");

    if (pasted.startsWith("8")) {
      pasted = "7" + pasted.slice(1);
    }
    pasted = pasted.slice(0, 11);

    const formatted = `+7 (${pasted.substring(1, 4)}) ${pasted.substring(
      4,
      7
    )}-${pasted.substring(7, 9)}-${pasted.substring(9, 11)}`;

    setPhone(formatted);
  }, []);

  const handleSubmit = useCallback((formData: FormData) => {
    startTransition(async () => {
      if (!canSubmit) return;
      
      setStatus('idle');
      setErrorMessage('');
      setFieldErrors({});
      
      const result: SubmitLeadResult = await submitLead(formData);
      
      if (result.ok) {
        setStatus('success');
        resetForm();
        // Автоматически скрываем сообщение об успехе через 5 секунд
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(result.error);
        if (result.fieldErrors) {
          setFieldErrors(result.fieldErrors);
        }
      }
    });
  }, [canSubmit, resetForm]);

  return (
    <div id="contact" className="mx-auto max-w-2xl">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">
        Оставить заявку
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        Мы перезвоним в рабочее время (Пн-Пт, 9:00–18:00).
      </p>

      <form
        ref={formRef}
        className="mt-6 grid gap-4"
        action={handleSubmit}
      >
        {/* Имя */}
        <div className="grid gap-2">
          <Label htmlFor="name">
            Имя <span className="text-destructive">*</span>
          </Label>
          <Input
            id="name"
            name="name"
            placeholder="Как к вам обращаться"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            minLength={2}
            maxLength={100}
            aria-invalid={!!fieldErrors.name}
            className={fieldErrors.name ? "border-destructive" : ""}
          />
          {fieldErrors.name && (
            <p className="text-sm text-destructive">{fieldErrors.name[0]}</p>
          )}
        </div>

        {/* Телефон */}
        <div className="grid gap-2">
          <Label htmlFor="phone">
            Телефон <span className="text-destructive">*</span>
          </Label>
          <InputMask
            id="phone"
            name="phone"
            mask="+7 (___) ___-__-__"
            replacement={{ _: /\d/ }}
            component={Input}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            onPaste={handlePaste}
            placeholder="+7 (___) ___-__-__"
            inputMode="tel"
            required
            aria-invalid={(!isPhoneValid && phone.length > 0) || !!fieldErrors.phone}
            className={
              (!isPhoneValid && phone.length > 0) || fieldErrors.phone
                ? "border-destructive"
                : ""
            }
          />
          {!isPhoneValid && phone.length > 0 && !fieldErrors.phone && (
            <p className="text-sm text-destructive">Введите полный номер телефона</p>
          )}
          {fieldErrors.phone && (
            <p className="text-sm text-destructive">{fieldErrors.phone[0]}</p>
          )}
        </div>

        {/* Комментарий */}
        <div className="grid gap-2">
          <Label htmlFor="comment">Комментарий</Label>
          <Textarea
            id="comment"
            name="comment"
            placeholder="Коротко о задаче (необязательно)"
            rows={4}
            maxLength={1000}
            aria-invalid={!!fieldErrors.comment}
            className={fieldErrors.comment ? "border-destructive" : ""}
          />
          {fieldErrors.comment && (
            <p className="text-sm text-destructive">{fieldErrors.comment[0]}</p>
          )}
        </div>

        {/* Кнопка и статус */}
        <div className="flex flex-col gap-3">
          <Button type="submit" disabled={!canSubmit} className="w-full sm:w-auto">
            {isPending ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Отправляем…
              </>
            ) : (
              "Отправить заявку"
            )}
          </Button>

          {/* Сообщения о статусе */}
          {status === 'success' && (
            <div className="flex items-center gap-2 text-sm text-green-600 bg-green-50 dark:bg-green-950/30 p-3 rounded-md">
              <CheckCircle className="h-4 w-4 shrink-0" />
              <span>Спасибо! Мы свяжемся с вами в ближайшее время.</span>
            </div>
          )}

          {status === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{errorMessage || 'Произошла ошибка. Попробуйте ещё раз.'}</span>
            </div>
          )}
        </div>
      </form>
    </div>
  );
}