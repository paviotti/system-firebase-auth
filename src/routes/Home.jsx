import { useEffect, useState } from "react";
import TitleForm from "../components/TitleForm";
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";
import { nanoid } from "nanoid";
import formValidate from "../utils/formValidate";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";
import { useForm } from "react-hook-form";
import { errorsFirebase } from "../utils/errosFirebase";

const Home = () => {
  const [copy, setCopy] = useState({});
  const { required, patternURL } = formValidate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
    setValue,
    setError,
  } = useForm();
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();

  const [newOriginID, setNewOriginID] = useState();
  useEffect(() => {
    console.log(data);
    getData();
  }, []);

  if (loading.getData) return <h1>Loading data...</h1>;
  if (error) return <p>{error}</p>;

  const onSubmit = async ({ url }) => {
    try {
      if (newOriginID) {
        await updateData(newOriginID, url);
        setNewOriginID("");
      } else {
        await addData(url);
      }
      resetField("url");
    } catch (error) {
      const { code, message } = errorsFirebase(error.code);
      setError(code, { message });
    }
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    setValue("url", item.origin);
    setNewOriginID(item.nanoid);
  };
  const pathURL = window.location.href;

  const handleClickCopy = async (nanoid) => {
    await navigator.clipboard.writeText(window.location.href + nanoid);
    setCopy({ [nanoid]: true });
  };

  return (
    <>
      {/* Adiciona um registro */}
      <TitleForm text={"Home"} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Digite uma URL"
          type="text"
          placeholder="https://bluuweb.org"
          {...register("url", {
            required,
            pattern: patternURL,
          })}
          error={errors.url}
        ></FormInput>
        <FormError error={errors.email} />

        {/* <input
          placeholder="ex: http://bluuweb.org"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        /> */}
        {newOriginID ? (
          <Button
            type={"submit"}
            text="EDIT URL"
            color="purple"
            loading={loading.updateData}
          />
        ) : (
          <Button
            type="submit"
            text={"ADD URL"}
            color="purple"
            loading={loading.addData}
          />
        )}
      </form>

      {/* Apaga um registro */}
      {data.map((item) => (
        <div
          key={item.nanoid}
          className="block max-w-2xl p-6 bg-white border border-gray-200 rounded-lg  hover:bg-gray-100
           dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 mb-2"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {pathURL}
            {item.nanoid}
          </h5>
          <p className="font-normal text-gray-700 dark:text-gray-400 mb-2">
            {item.origin}
          </p>
          {/* <p>{item.uid}</p> */}
          <div className="flex space-x-2">
            <Button
              type="button"
              text={"Delete"}
              color="red"
              loading={loading[nanoid]}
              onClick={() => handleClickDelete(item.nanoid)}
            />
            <Button
              type="button"
              text={"Edit"}
              color="green"
              onClick={() => handleClickEdit(item)}
            />
            <Button
              type="button"
              text={copy[item.nanoid] ? "Copied!" : "Copy"}
              color="blue"
              onClick={() => handleClickCopy(item.nanoid)}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Home;
