import React from "react";
import {mount, shallow} from "enzyme";
import { Buying } from "./Buying";

describe("Buying", () => {
    it("renders", () => {
        const buying = {
            name: "Test",
            cost: 100.00
        };
        const wrapper = mount(<Buying buying={buying}/>);
        expect(wrapper.childAt(0).text()).toMatch(buying.name);
        expect(wrapper.childAt(0).text()).toMatch(`${buying.cost} р.`);
    });
});
