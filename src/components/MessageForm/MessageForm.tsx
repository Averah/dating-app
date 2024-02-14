import React, { memo } from "react";
import { useForm } from "react-hook-form";
import Button from "../../ui/Button/Button";
import cls from './MessageForm.module.scss';

interface MessageFormProps {
    sendMessage: (message:string) => void;
    isMessageSent: boolean;
}

interface IUserSubmitForm  {
    message: string
}

const MessageForm: React.FC<MessageFormProps> = memo(({ sendMessage, isMessageSent }) => {
    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<IUserSubmitForm>({ mode: "onChange" });

    const onSubmit = (data: IUserSubmitForm) => {
        sendMessage(data.message)
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={cls.MessageForm}>
            <div>
                <textarea
                className={cls.textarea}
                    placeholder="Введите сообщение..."
                    {...register("message", {
                        required: "You cannot send an empty message",
                    })}
                />
            </div>
            {isMessageSent && <div className={cls.messageStatus}>Сообщение отправлено</div>}
            <div>
                <Button className={cls.messageBtn} type='submit'>Отправить</Button>
            </div>
        </form>
    );
});

export default MessageForm;