import React, { useState } from "react";
import editbtn from "../../../img/edit-icon.gif";
import deletebtn from "../../../img/delete-icon.gif";
import CollectionForm from "./CollectionForm.tsx";
import { useDispatch, useSelector } from "react-redux";
import {
  CollectionItemType,
  ReduxActions,
  State,
} from "../../../types/types.ts";
import FormHeader from "../FormHeader.tsx";

const CollectionsList = () => {
  const [initialData, setInitialData] = useState<CollectionItemType | {}>({});
  const collections = useSelector((state: State) => state.collections);
  const dispatch = useDispatch();

  const editCollection = (item: CollectionItemType) => {
    if (item._id) setInitialData({ ...item, prev: item.collection });
    else setInitialData({});
  };

  const handleDelete = (id: string) => {
    dispatch({ type: ReduxActions.DeleteCollection, payload: id });
    window.electronAPI.deleteCollection(id);
  };

  return (
    <div style={{ marginTop: "40px" }}>
      <FormHeader text="Редактор категорий" />
      <div style={{ display: "flex" }}>
        <CollectionForm props={initialData} />
        <div style={{ width: "50%" }}>
          {collections.map((collection, index) => (
            <div key={index} className={"center-div"}>
              <h6 className={"header"}>{collection.collection}</h6>
              <div>
                <button
                  onClick={() => editCollection(collection)}
                  style={{ marginRight: "30px" }}
                >
                  <img alt={"../../img/edit-icon.gif"} src={editbtn} />
                </button>
                <button onClick={() => handleDelete(collection._id)}>
                  <img alt={"../../img/delete-icon.gif"} src={deletebtn} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CollectionsList;
