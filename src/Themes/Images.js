import { StaticVar } from "Config";
import Profile from "../Assets/Images/avatar.png";
import bgProfile from "../Assets/Images/bg-profile.png";
import Danger from "../Assets/Images/danger.png";
import Heart from "../Assets/Images/heart.png";
import QRCode from "../Assets/Images/qrcode1.png";
import Report from "../Assets/Images/report.png";
import Logo from "../Assets/logolrt.png";

const Images = {
  logoHeader: StaticVar.URL_API + "/upload/repo/img/header-logo.png",
  logoHorizontal: StaticVar.URL_API + "/upload/repo/img/logo.png",
  logoVertical: StaticVar.URL_API + "/upload/repo/img/logo-vertical.png",
  bgLogin: StaticVar.URL_API + "/upload/repo/img/background-login.png",
  bgProfileMedical:
    StaticVar.URL_API + "/upload/repo/img/bg-profile-medical.png",
  bgProfileTrainDriver:
    StaticVar.URL_API + "/upload/repo/img/bg-profile-traindriver.png",
  bgProfile,
  qrcode1: QRCode,
  profile: Profile,
  heart: Heart,
  report: Report,
  danger: Danger,
  logoIcon: Logo,
};

export default Images;
