import { AccountCircle } from "@mui/icons-material";
import {
  Box,
  Button,
  Container,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { StaticVar } from "Config";
import { WorkOrderContext } from "Context";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CustomTextField from "Component/Input/CustomTextField";
import { toast } from "react-toastify";
import API from "Services/Api";
import CustomDatePicker from "Component/HF/DatePicker";
import CustomRadioGroup from "Component/HF/CustomRadioGroup";
import { useNavigate } from "react-router-dom";

// initial value form
const initialValues = {
  name: "",
  nickname: "",
  order: 1,
  idNumber: "",
  birth: {
    date: undefined,
    place: "",
  },
  gender: "",
  email: "",
  certificate: "", // nomor sertifikat
  address: "",
  picture: "",
  imgPict: [],
  fingerID: "",
  phone: "",
  division: undefined,
  departement: undefined,
  jobPosition: null,
  // supervisor: null,
  education: [],
  employment: [],
  training: [],
  award: [],
};

const validationSchema = Yup.object({
  name: Yup.string().required("Nama tidak boleh kosong"),
  idNumber: Yup.string("Harap masukkan NIP").required("NIP tidak boleh kosong"),
  // division: Yup.object().required("Divisi tidak boleh kosong"),
  // departement: Yup.object().required("Departemen tidak boleh kosong"),
  // jobPosition: Yup.object().required("Jabatan tidak boleh kosong"),
  certificate: Yup.string(),
  email: Yup.string().email("Harap masukkan email yang valid"),
  address: Yup.string(),
  order: Yup.number(),

  // jobPosition: Yup.object().required("Jabatan tidak boleh kosong"),
});

const EditProfile = () => {
  const navigate = useNavigate();
  const { profileById } = useContext(WorkOrderContext);

  const [imgProfile, setImgProfile] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [formState, setFormState] = useState({});

  const { register, watch, control, setValue, reset, handleSubmit } = useForm({
    defaultValues: initialValues,
  });

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setImgProfile(objectUrl);

      handleUpload(file);
    }
  };

  const handleUpload = async (file) => {
    if (!file) {
      toast.error("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await API.uploadFile(
        `users/${profileById.name}`,
        formData
      );

      const { uploadedFiles, path } = response.data;

      const _uploadedFiles = uploadedFiles?.map((i) => ({
        ...i,
        path,
      }));
      // console.log("up");
      setValue("imgPict", _uploadedFiles);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  const onSubmit = async (values) => {
    await API.updateTemp(profileById._id, values)
      .then((res) => {
        console.log("success update temp");
        toast.success("Data berhasil diubah");
        navigate(-1);
      })
      .catch((err) => {
        console.log("erro submit", err);
      });
  };

  useEffect(() => {
    if (!formState._id && profileById._id) {
      if (profileById.imgPict?.length > 0) {
        let img = profileById.imgPict[0];
        img = `${StaticVar.URL_API}/uploads/${img?.path}/${img?.uploadedName}`;

        setImgProfile(img);
      }

      reset(profileById);
    }

    return () => {
      URL.revokeObjectURL(imgProfile);
    };
  }, [profileById._id]);

  return (
    <Box sx={{ pt: 2, pb: 3, px: 3 }}>
      <Container maxWidth="xl">
        <Typography textAlign="center" gutterBottom variant="h4">
          Edit Profil
        </Typography>

        <Box
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
          component="form"
          sx={{ width: "100%" }}
        >
          <Stack>
            <Box
              sx={{ width: "100%", display: "flex", justifyContent: "center" }}
            >
              <input
                accept="image/*"
                id="img-input"
                hidden
                type="file"
                onChange={handleFileChange}
              />
              <Box component="label" htmlFor="img-input">
                {imgProfile ? (
                  <img
                    // src={StaticVar.URL_API + "/upload" + profilePict}
                    src={imgProfile}
                    style={{
                      width: 160,
                      borderRadius: "50%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <>
                    <AccountCircle
                      sx={{
                        color: "#BDBDBD",
                        fontSize: 124,
                        borderRadius: "50%",
                      }}
                    />
                  </>
                )}
              </Box>
            </Box>

            <CustomTextField
              watch={watch}
              {...register("name")}
              fullWidth
              label="Nama"
            />
            <CustomTextField
              watch={watch}
              {...register("idNumber")}
              fullWidth
              label="NIP"
            />
            <CustomTextField
              watch={watch}
              {...register("nickname")}
              fullWidth
              label="Nama Panggilan"
            />
            <CustomTextField
              watch={watch}
              {...register("birth.place")}
              fullWidth
              label="Tempat lahir"
            />

            <CustomDatePicker
              label="Tanggal lahir"
              format="dd/MM/yyyy"
              name="birth.date"
              control={control}
            />
            <Box>
              <Typography>Jenis Kelamin</Typography>
              <CustomRadioGroup
                row
                name="gender"
                control={control}
                options={gender}
              />
            </Box>
            <CustomTextField
              watch={watch}
              {...register("phone")}
              fullWidth
              label="Telepon"
            />
            <CustomTextField
              watch={watch}
              {...register("email")}
              fullWidth
              label="Email"
            />
            <CustomTextField
              watch={watch}
              {...register("certificate")}
              fullWidth
              label="Nomor Sertifikat"
            />

            <CustomTextField
              fullWidth
              watch={watch}
              label="Urutan"
              {...register("order")}
              type="number"
            />
            <CustomTextField
              watch={watch}
              fullWidth
              label="Alamat"
              {...register("address")}
              multiline
              rows={4}
            />

            <Stack mt={2} gap={2}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                fullWidth
              >
                Submit
              </Button>
              <Button
                onClick={() => navigate(-1)}
                variant="contained"
                color="error"
                fullWidth
              >
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

const gender = [
  { value: "Perempuan", label: "Perempuan" },
  { value: "Laki-laki", label: "Laki-laki" },
];

export default EditProfile;
