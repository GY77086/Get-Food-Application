import { sum } from "../sum";
test ("sum function should return the sum of two numbers" ,
    () => 
    {
        const result = sum(3, 4);

        // Assrertion 
        expect(result).toBe(7);
    }
);
