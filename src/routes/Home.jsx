import { useEffect, useState } from "react";
import TitleForm from "../components/TitleForm";
import { useFirestore } from "../hooks/useFirestore";
import Button from "../components/Button";
import { nanoid } from "nanoid";

const Home = () => {
  const { data, error, loading, getData, addData, deleteData, updateData } =
    useFirestore();
  const [text, setText] = useState("");
  const [newOriginID, setNewOriginID] = useState();
  useEffect(() => {
    console.log(data);
    getData();
  }, []);
  if (loading.getData) return <h1>Loading data...</h1>;
  if (error) return <p>{error}</p>;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newOriginID) {
      await updateData(newOriginID, text);
      setNewOriginID("");
      setText("");
      return;
    }
    // passa o valor do campo text para o Firestore
    await addData(text);
    setText("");
  };

  const handleClickDelete = async (nanoid) => {
    await deleteData(nanoid);
  };

  const handleClickEdit = async (item) => {
    setText(item.origin);
    setNewOriginID(item.nanoid);
  };

  return (
    <>
      {/* Adiciona um registro */}
      <TitleForm text={"Home"} />
      <form onSubmit={handleSubmit}>
        <input
          placeholder="ex: http://bluuweb.org"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
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
        <div key={item.nanoid}>
          <p>{item.nanoid}</p>
          <p>{item.origin}</p>
          <p>{item.uid}</p>
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
        </div>
      ))}
    </>
  );
};

export default Home;
