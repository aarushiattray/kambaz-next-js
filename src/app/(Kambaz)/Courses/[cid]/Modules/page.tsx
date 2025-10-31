"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import ModulesControls from "./ModulesControls";
import { ListGroup, ListGroupItem, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import { useSelector, useDispatch } from "react-redux";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import "../../../styles.css";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  // Case-insensitive check to avoid mismatch issues
  const isFaculty = currentUser?.role?.toUpperCase() === "FACULTY";

  return (
    <div className="wd-modules">
      {/* + Module control: visible to everyone, button does nothing for non-FACULTY */}
      <ModulesControls
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={() => {
          if (!isFaculty) return; // non-FACULTY cannot add
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }}
      />
      <br />
      <br />

      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroupItem
              key={module._id}
              className="wd-module p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
                {/* Left side: name & edit input */}
                <div className="d-flex align-items-center flex-grow-1">
                  <BsGripVertical className="me-2 fs-3" />
                  {!module.editing && module.name}
                  {module.editing && isFaculty && (
                    <FormControl
                      className="w-50 ms-2"
                      defaultValue={module.name}
                      onChange={(e) =>
                        dispatch(
                          updateModule({ ...module, name: e.target.value })
                        )
                      }
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          dispatch(updateModule({ ...module, editing: false }));
                        }
                      }}
                    />
                  )}
                </div>

                {/* Always render control buttons for everyone,
                    but only FACULTY see edit/delete inside */}
                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={
                    isFaculty
                      ? (moduleId) => dispatch(deleteModule(moduleId))
                      : undefined
                  }
                  editModule={
                    isFaculty
                      ? (moduleId) => dispatch(editModule(moduleId))
                      : undefined
                  }
                  isFaculty={isFaculty}
                />
              </div>

              {/* Lessons */}
              {module.lessons && (
                <ListGroup className="wd-lessons rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <ListGroupItem
                      key={lesson._id}
                      className="wd-lesson p-3 ps-1 d-flex align-items-center justify-content-between"
                    >
                      <div>
                        <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      </div>
                      {/* Always render LessonControlButtons (only internal behavior changes later if needed) */}
                      <LessonControlButtons/>
                    </ListGroupItem>
                  ))}
                </ListGroup>
              )}
            </ListGroupItem>
          ))}
      </ListGroup>
    </div>
  );
}
