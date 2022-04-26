import React from "react";

import { render, cleanup } from "@testing-library/react";

import Appointment from '../Appointment/index';

afterEach(cleanup);

describe("Appointment component tests", () => {

  it("renders without crashing", () => {
    render(<Appointment />);
  });

  it("doesn't call the function", () => {
    const fn = jest.fn();
    expect(fn).toHaveBeenCalledTimes(0);
  });

  it("calls the function", () => {
    const fn = jest.fn();
    fn();
    expect(fn).toHaveBeenCalledTimes(1);
  });
});