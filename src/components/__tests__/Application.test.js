import React from "react";

import {
  render, cleanup, fireEvent, waitForElement, getByText,
  prettyDOM, getAllByTestId, getByAltText, getByPlaceholderText,
  queryByText
} from "@testing-library/react";

import Application from "components/Application";

afterEach(cleanup);

describe("Application component tests", () => {

  it("defaults to Monday and changes the schedule when a new day is selected", async () => {
    const { getByText } = render(<Application />);

    await waitForElement(() => getByText("Monday"));

    fireEvent.click(getByText("Tuesday"));
    expect(getByText("Leopold Silvers")).toBeInTheDocument();

  });

  it("loads data, books an interview and reduces the spots remaining for the first day by 1", async () => {

    const { container } = render(<Application />);
    await waitForElement(() => getByText(container, "Archie Cohen"));

    const appointment = getAllByTestId(container, "appointment")[0];
    fireEvent.click(getByAltText(appointment, "Add"));

    const studentNameInput = getByPlaceholderText(appointment, /enter student name/i);
    fireEvent.change(studentNameInput, { target: { value: "Lydia Miller-Jones" } });
    fireEvent.click(getByAltText(appointment, "Sylvia Palmer"));
    fireEvent.click(getByText(appointment, "Save"));

    expect(getByText(appointment, "Saving")).toBeInTheDocument();

    await waitForElement(() => getByText(appointment, "Lydia Miller-Jones"));

    const day = getAllByTestId(container, "day").find(day => queryByText(day, "Monday"));
    expect(getByText(day, /no spots remaining/i)).toBeInTheDocument();
  });
});