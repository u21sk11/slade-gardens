import { generateClient, get } from "aws-amplify/data";
import outputs from "../../amplify_outputs.json";
import { Amplify } from "aws-amplify";
import { auditError } from "./audit";

Amplify.configure(outputs);
const client = generateClient({
  authMode: "userPool",
});

const date = new Date();
const dateString = date.toDateString();

export async function increaseVisitorCount() {
  try {
    const today = await getToday();
    console.log(JSON.stringify(today));
    today.totalVisitors++;
    const increase = await client.models.Statistics.update(today);
    const { errors: responseError } = increase;
    if (responseError) throw new Error(responseError[0].message);
    console.log("Visitor count increased");
  } catch (error) {
    auditError("Error increasing visitor count: " + error);
  }
}

export async function increaseChildrenCount() {
  try {
    const today = await getToday();

    if (today === undefined) {
      await newDay();
      return;
    }

    today.totalChildren++;
    const increase = await client.models.Statistics.update(today);
    const { errors: responseError } = increase;
    if (responseError) throw new Error(responseError[0].message);
    console.log("Children count increased");
  } catch (error) {
    auditError("Error increasing children count: " + error);
  }
}

export async function newDay() {
  try {
    const createDay = await client.models.Statistics.create({
      fullDate: dateString,
      day: date.getDate(),
      month: date.getMonth() + 1,
      year: date.getFullYear(),
      totalVisitors: 0,
      totalChildren: 0,
    });
    const { errors: responseError } = createDay;
    if (responseError) throw new Error(responseError[0].message);
  } catch (error) {
    auditError("Error increasing visitor count: " + error);
  }
}

export async function getToday() {
  try {
    const today = await client.models.Statistics.get({
      fullDate: dateString,
    });
    const { errors: responseError } = today;
    if (responseError) throw new Error(responseError[0].message);

    if (today.data === null) {
      await newDay();
      return await getToday();
    }

    return today.data;
  } catch (error) {
    auditError("Error getting today's statistics: " + error);
  }
}