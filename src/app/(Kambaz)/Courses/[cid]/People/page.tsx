"use client";
import { useState, useEffect, use } from "react"; // add 'use', was getting error otherwise 
import PeopleTable from "./Table/page";
import * as coursesClient from "../../client";

export default function PeoplePage({ params }: any) {
  const resolvedParams = use(params);   // unwrap the params promise, was getting error otherwise 
  const { cid } = resolvedParams;

  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    const enrolled = await coursesClient.findUsersForCourse(cid);
    setUsers(enrolled);
  };

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return <PeopleTable users={users} fetchUsers={fetchUsers} />;
}
