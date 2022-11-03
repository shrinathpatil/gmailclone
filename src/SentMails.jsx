import React, { useEffect, useState } from "react";
import EmailRow from "./EmailRow";
import "./EmailList.css";
import Section from "./Section";
import { Checkbox, IconButton } from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RedoIcon from "@mui/icons-material/Redo";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardHideIcon from "@mui/icons-material/KeyboardHide";
import SettingsIcon from "@mui/icons-material/Settings";
import InboxIcon from "@mui/icons-material/Inbox";
import PeopleIcon from "@mui/icons-material/People";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

import { db } from "./firebase-Config";
import { query, collection, orderBy, getDocs } from "firebase/firestore";
import { useDispatch, useSelector } from "react-redux";
import { selectUser, setSent } from "./features/userSlice";

const SentMails = () => {
  const [emails, setEmails] = useState([]);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    const getMails = async () => {
      const getQuery = query(
        collection(db, `emails/${user.email}/sentmails`),
        orderBy("timestamp", "desc")
      );

      const mailQuery = await getDocs(getQuery);
      const mails = mailQuery.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));

      setEmails(mails);
    };

    getMails();
  }, []);

  useEffect(() => {
    dispatch(setSent(emails.length));
  }, [emails]);

  console.log(emails);
  return (
    <div className="emaillist">
      <div className="emaillist-settings">
        <div className="emaillist-settingsleft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="emaillist-settingsright">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>
      <div className="emaillist-sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1a73e8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>
      <div className="emaillist-list">
        {emails.map(({ id, data: { to, subject, message, timestamp } }) => (
          <EmailRow
            id={id}
            key={id}
            title={to}
            subject={subject}
            description={message}
            time={new Date(timestamp?.seconds * 1000).toUTCString()}
          />
        ))}
      </div>
    </div>
  );
};

export default SentMails;
