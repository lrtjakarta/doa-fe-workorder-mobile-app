import { createContext, useCallback, useState } from "react";
import API from "Services/Api";

export const AssesmentContext = createContext({
  content: {},
  contents: [],
  pocketBook: {},
  pocketBooks: [],

  getPocketBooks: (params) => {},
  getPocketBook: (id, params) => {},
  getContents: (params) => {},
  getContent: (id, params) => {},
  getContentByTitle: (id, params) => {},
  getDataAssessment: (id, monthly) => {},
  getTotalAssessment: (id, monthly) => {},
  getDetailAssessment: (id) => {},
  setOpenDrawer: () => {},
});

export default function AssesmentProvider(props) {
  const [contents, setContents] = useState([]);
  const [content, setContent] = useState({});
  const [pocketBooks, setPocketBooks] = useState([]);
  const [pocketBook, setPocketBook] = useState({});

  const [assessment, setAssessment] = useState(null);
  const [filterAssessment, setFilterAssessment] = useState([]);
  const [totalAssessment, setTotalAssessment] = useState([]);
  const [detailAssessment, setDetailAssessment] = useState({});
  const [dateAssessment, setDateAssessment] = useState("");

  const getPocketBooks = useCallback(
    async (params) => {
      await API.getPocketBooks(params)
        .then((res) => {
          const { data, totalItems, totalCount } = res.data;

          setPocketBooks(data);
        })
        .catch((err) => console.log("err get pocketBooks", err));
    },
    [pocketBooks]
  );

  const getPocketBook = useCallback(
    async (id, params = {}) => {
      const newParams = { _id: id, ...params };
      await API.getPocketBooks(newParams)
        .then((res) => {
          const { data } = res.data;

          setPocketBook(data[0]);
        })
        .catch((err) => console.log("err get pocketBook", err));
    },
    [pocketBook]
  );

  const getContents = useCallback(
    async (params) => {
      await API.getContents(params)
        .then((res) => {
          const { data, totalItems, totalCount } = res.data;

          setContents(data);
        })
        .catch((err) => console.log("err get contents", err));
    },
    [contents]
  );

  const getContent = useCallback(
    async (id, params) => {
      await API.getContent(id, params)
        .then((res) => {
          const { data } = res;

          setContent(data[0]);
        })
        .catch((err) => console.log("err get content", err));
    },
    [content]
  );

  const getContentByTitle = useCallback(
    async (title, params) => {
      await API.getContentByTitle(title, params)
        .then((res) => {
          const { data } = res;

          setContent(data);
        })
        .catch((err) => console.log("err get content", err));
    },
    [content]
  );

  const getDataAssessment = (nik, monthly) => {
    return API.getAssessment({ params: { nik, monthly } })
      .then((res) => {
        setAssessment(res.data);
        setFilterAssessment(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  const getTotalAssessment = (nik, monthly) => {
    return API.getQueryAssessmentTotal({ params: { nik, monthly } })
      .then((res) => {
        setTotalAssessment(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  const getDetailAssessment = (id) => {
    return API.getAssessment({ params: { id } })
      .then((res) => {
        setAssessment(res.data);
        setFilterAssessment(res.data);
      })
      .catch((err) => console.log("error", err));
  };

  return (
    <AssesmentContext.Provider
      value={{
        content,
        contents,
        pocketBook,
        pocketBooks,
        assessment,
        filterAssessment,
        totalAssessment,
        detailAssessment,
        dateAssessment,

        getPocketBooks,
        getPocketBook,
        getContents,
        getContent,
        getContentByTitle,
        getDataAssessment,
        getTotalAssessment,
        getDetailAssessment,
        setDetailAssessment,
        setDateAssessment,
      }}
      {...props}
    />
  );
}
