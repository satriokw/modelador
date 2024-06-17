import { useState } from "react";
import Form from "@rjsf/antd";
import validator from "@rjsf/validator-ajv8";

import { convertJsonSchema, convertUiSchema } from "@/utils/adaptor";

import taskDatas from "@/data/tasks.json";
import { Button, Select } from "@mantine/core";
import { useMemo } from "react";
import { dataMap } from "@/utils/constant";
import axios, { HttpStatusCode } from "axios";

export default function FormPage() {
  const [selectedTask, setSelectedTask] = useState<any>(null);
  const [allFormData, setAllFormData] = useState(false);
  const [isConvertForm, setIsConvertForm] = useState(false);
  const [schema, setSchema] = useState({});
  const [uiSchema, setUiSchema] = useState({});

  /**
   * fetch data from flowable task by users
   */
  function getData() {
    const username = "santo";
    const url =
      process.env.NEXT_PUBLIC_FLOWABLE_API_HOSTNAME! +
      "/flowable-rest/service/runtime/tasks?assignee=" +
      username;

    axios
      .get(url, {
        auth: {
          username: process.env.NEXT_PUBLIC_FLOWABLE_API_USERNAME!,
          password: process.env.NEXT_PUBLIC_FLOWABLE_API_PASSWORD!,
        },
      })
      .then((res) => {
        console.log(res);
        if (res.status == HttpStatusCode.Ok) {
          console.log("ok");
        }
      });
    setAllFormData(!allFormData);
  }

  function convertDataSchema() {
    setIsConvertForm(true);
    // console.log(dataMap[selectedTask.value]);
    if (!dataMap[selectedTask.value].hasOwnProperty("error")) {
      setSchema(convertJsonSchema(dataMap[selectedTask.value]));
      setUiSchema(convertUiSchema(dataMap[selectedTask.value]));
    }
  }

  function changeTask(option: any) {
    setIsConvertForm(false);
    setSelectedTask(option);
  }

  const log = (type: any) => console.log.bind(console, type);

  // console.log(allFormData);

  const datas = useMemo(
    () =>
      taskDatas.data.map((item) => ({
        value: item.id,
        label: `${item.name} -- ${item.id}`,
        key: item.id,
      })),
    [taskDatas]
  );

  return (
    <div className="p-8 grid grid-cols-2 gap-8">
      <div>
        <div className="mb-8">
          <span>Get All Tasks</span>
          <Button className="ml-4" onClick={() => getData()}>
            Click here
          </Button>
        </div>
        <div className="mb-8 border border-black p-4">
          {!allFormData ? (
            <span>no Data...</span>
          ) : (
            <>
              <p className="mb-4 text-2xl">Select form by task-id</p>
              <Select
                data={datas}
                onChange={(_value, option) => changeTask(option)}
              />
            </>
          )}
        </div>
        <p className="mb-4">
          Get selected form model and Convert Form{" "}
          <Button className="ml-4" onClick={() => convertDataSchema()}>
            Click here
          </Button>
        </p>
      </div>
      <div>
        <p className="mb-4">RJSF FORMS</p>
        {isConvertForm && (
          <div className="border border-slate-500 p-4">
            {selectedTask &&
            dataMap[selectedTask.value].hasOwnProperty("error") ? (
              <>
                <p>{dataMap[selectedTask.value].error.message}</p>
                <p>{dataMap[selectedTask.value].error.exception}</p>
              </>
            ) : (
              <Form
                schema={schema}
                validator={validator}
                uiSchema={uiSchema}
                onChange={log("changed")}
                onSubmit={log("submitted")}
                onError={log("errors")}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
