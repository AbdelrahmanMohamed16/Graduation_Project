import {
  Box,
  Container,
  Grid2,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import InputField from "../../components/Input/InputField";
import ButtonCompnent from "../../components/Button/ButtonCompnent";
import login_background from "../../assets/images/login_background.png";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/userSlice";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    const logined = await dispatch(loginUser({ code: name, password }));
    console.log(logined.payload);
    if (logined.payload.data) {
      navigate(`/firstPage`);
    }
    setName("");
    setPassword("");
  };
  return (
    <Grid2
      container
      justifyContent={"center"}
      alignItems={{ xs: "center", lg: "initial" }}
      display={{ xs: "flex" }}
      color={"#FFFFFF"}
      height={"100vh"}
      sx={{
        background: {
          lg: `url(${login_background}) no-repeat`,
        },
        backgroundSize: { lg: "contain" },
        backgroundPositionY: { lg: "100%" },
      }}
    >
      <Stack
        spacing={3}
        my={4}
        p={4}
        sx={{
          background: "#1A3553",
          borderRadius: { sm: "5px" },
          textAlign: "center",
        }}
        height={"200px"}
        width={{ xs: "70%", sm: "60%", lg: "25%" }}
      >
        <Typography variant="h2" fontFamily={"El Messiri"}>
          تسجيل الدخول
        </Typography>
        <InputField label="اسم المستخدم" text={true} set={setName} val={name} />
        <InputField
          label="كلمة المرور"
          text={true}
          type="password"
          set={setPassword}
          val={password}
        />
        <Stack sx={{ width: "50%", margin: "auto auto 0 auto !important" }}>
          <ButtonCompnent text="الدخول" onclick={handleLogin} />
        </Stack>
      </Stack>
    </Grid2>
  );
}
