import React from "react";
import "./SendMail.css";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessage } from "./features/mailSlice";
import { db } from "./firebase-Config";
import {
  doc,
  setDoc,
  collection,
  addDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { selectUser } from "./features/userSlice";

const SendMail = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);

    const sendQuery = query(collection(db, `emails/${formData.to}/mails`));
    const sentQ = query(collection(db, `emails/${user.email}/sentmails`));

    await addDoc(sendQuery, {
      from: user.email,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
    });

    await addDoc(sentQ, {
      to: formData.to,
      subject: formData.subject,
      message: formData.message,
      timestamp: serverTimestamp(),
    });

    dispatch(closeSendMessage());
  };

  return (
    <div className="sendmail">
      <div className="sendmail-header">
        <h3>New Message</h3>
        <CloseIcon
          className="sendmail-close"
          onClick={() => dispatch(closeSendMessage())}
        />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          {...register("to", { required: true })}
        />
        {errors.to && <p className="sendmail-error">To is Required !</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          {...register("subject", { required: true })}
        />
        {errors.subject && (
          <p className="sendmail-error">Subject is Required !</p>
        )}
        <input
          name="message"
          placeholder="Message..."
          type="text"
          {...register("message", { required: true })}
          className="sendmail-message"
        />
        {errors.message && (
          <p className="sendmail-error">Message is Required !</p>
        )}
        <div className="sendmail-options">
          <Button
            className="sendmail-send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SendMail;
