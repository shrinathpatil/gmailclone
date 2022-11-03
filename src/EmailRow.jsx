import React from "react";
import { useNavigate } from "react-router-dom";
import "./EmailRow.css";
import { Checkbox, IconButton } from "@mui/material";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import LabelImportantOutlinedIcon from "@mui/icons-material/LabelImportantOutlined";
import { useDispatch } from "react-redux";
import { selectMail } from "./features/mailSlice";

const EmailRow = ({ id, title, subject, description, time }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const openMail = () => {
    dispatch(
      selectMail({
        id,
        title,
        subject,
        description,
        time,
      })
    );

    navigate("/mail");
  };
  return (
    <div onClick={openMail} className="emailrow">
      <div className="emailrow-options">
        <Checkbox />
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>
      <h3 className="emailrow-title">{title}</h3>
      <div className="emailrow-message">
        <h4>
          {subject}
          {"  "} <span className="emailrow-description">{description}</span>
        </h4>
      </div>
      <p className="emailrow-time">{time}</p>
    </div>
  );
};

export default EmailRow;
