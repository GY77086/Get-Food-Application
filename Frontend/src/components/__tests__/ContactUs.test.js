import {render, screen} from "@testing-library/react";
import ContactUs from "../ContactUs";
import "@testing-library/jest-dom";

describe ("ContactUs component tests",
    () => 
    {
        it ("should load ContactUs component correctly",
            () => 
            {
                render(<ContactUs />);
                const heading = screen.getByRole("heading", {name: "Contact Us"});
                expect(heading).toBeInTheDocument();
            }
        );
    }
);

test ("should load button inside ContactUs correctly",
    () => 
    {
        render(<ContactUs />);
        const button = screen.getByRole("button");

        // Assertions
        expect(button).toBeInTheDocument();
    }
);


test ("should load input field for name inside ContactUs correctly",
    () => 
    {
        render(<ContactUs />);
        const inputName = screen.getByPlaceholderText("Name");

        // Assertions
        expect(inputName).toBeInTheDocument();
    }
);


test ("should load 2 input fields inside ContactUs correctly",
    () => 
    {
        render(<ContactUs />);
        const inputFields = screen.getAllByRole("textbox"); 


        // console.log(inputFields [0]);
        // Assertions
        // expect(inputFields).toHaveLength(2);
        // OR 
        expect(inputFields.length).toBe(2);
    }
);
