"use client";

import { useState } from "react";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import { BsSlashCircle } from "react-icons/bs";
import GreenCheckmark from "./GreenCheckmark";
import ModuleEditor from "./ModuleEditor";

export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }
) {
  const [show, setShow] = useState(false); // state for ModuleEditor dialog
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap mb-3">
      {/* Collapse All button */}
      <Button variant="secondary" className="me-2" id="wd-collapse-all">
        Collapse All
      </Button>

      {/* View Progress button */}
      <Button variant="secondary" className="me-2" id="wd-view-progress">
        View Progress
      </Button>

      {/* Publish dropdown */}
      <Dropdown className="me-2 d-inline-block">
        <DropdownToggle variant="secondary" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </DropdownToggle>
        <DropdownMenu>
          <DropdownItem id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </DropdownItem>
          <DropdownItem id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </DropdownItem>
          <DropdownItem id="wd-unpublish-all-modules-and-items">
            <BsSlashCircle className="me-2" /> Unpublish all modules and items
          </DropdownItem>
          <DropdownItem id="wd-unpublish-modules-only">
            <BsSlashCircle className="me-2" /> Unpublish modules only
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      {/* Add Module button opens ModuleEditor dialog */}
      <Button variant="danger" id="wd-add-module-btn" onClick={handleShow}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* ModuleEditor dialog */}
      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
