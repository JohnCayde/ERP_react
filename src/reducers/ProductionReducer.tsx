import * as production from "../actions/ProductionAction";
import * as ProductionConstants from "../constants/Production";
import { ProductionState, ProductionAction } from "../types/Production";

const initialState: ProductionState = {
  sections: [
    {
      id: "34681fd9-5be7-461e-ad28-477b7df31135",
      name: "Casting",
      process: "34681fd9-5be7-461e-ad28-477b7df31135",
      planning: 0,
    },
    {
      id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      name: "Cutting",
      process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      planning: 0,
    },
    {
      id: "ff774a8c-c409-4443-8da9-dab69c95743a",
      name: "Treatment",
      process: "ff774a8c-c409-4443-8da9-dab69c95743a",
      planning: 0,
    },
    {
      id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
      name: "Finishing",
      process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
      planning: 0,
    },
  ],
  machines: [
    {
      id: "123ab3bc-e450-4461-adf4-fc40b27884a9",
      name: "Machine CA_A",
      section: "34681fd9-5be7-461e-ad28-477b7df31135",
    },
    {
      id: "ebd13ff6-95b7-4ff7-8911-ba72b9fc171b",
      name: "Machine CA_B",
      section: "34681fd9-5be7-461e-ad28-477b7df31135",
    },
    {
      id: "42f8f903-78bd-438a-863e-5b52e2aa7e60",
      name: "Machine CA_C",
      section: "34681fd9-5be7-461e-ad28-477b7df31135",
    },
    {
      id: "c986d0c7-3f4e-47ec-b41a-4abaf75cb002",
      name: "Machine CU_A",
      section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
    },
    {
      id: "2a424656-154b-41d4-8997-9508b51447b0",
      name: "Machine CU_B",
      section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
    },
    {
      id: "1eb4e514-7897-4743-bb2d-158846026df2",
      name: "Machine CU_C",
      section: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
    },
    {
      id: "65fa0444-b884-48a5-a9ea-8fdb5b71be56",
      name: "Machine TR_A",
      section: "ff774a8c-c409-4443-8da9-dab69c95743a",
    },
    {
      id: "19088b0e-e24e-43a0-a42f-950b6b30d733",
      name: "Machine TR_B",
      section: "ff774a8c-c409-4443-8da9-dab69c95743a",
    },
    {
      id: "da3dee9e-c894-4ce0-9662-7af6fd14a035",
      name: "Machine TR_C",
      section: "ff774a8c-c409-4443-8da9-dab69c95743a",
    },
    {
      id: "190ee97d-5b36-481b-be41-f3b263697ad2",
      name: "Machine FI_A",
      section: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
    },
    {
      id: "fb6c1722-03fb-4230-a370-fedfb6f0700d",
      name: "Machine FI_B",
      section: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
    },
    {
      id: "8b75f280-2d5f-48f3-a8eb-38c03719b1fa",
      name: "Machine FI_C",
      section: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
    },
  ],
  components: [
    {
      id: "3b29fffb-783d-492c-aad0-e1cae452974c",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "pending",
      process: [
        {
          process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          complete: false,
          machine: "2a424656-154b-41d4-8997-9508b51447b0",
        },
        {
          process: "ff774a8c-c409-4443-8da9-dab69c95743a",
          complete: false,
          machine: "",
        },
        {
          process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          complete: false,
          machine: "",
        },
      ],
    },
    {
      id: "4ff33a40-1693-4b8c-90a0-36c98b13106d",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "pending",
      process: [
        {
          process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          complete: true,
          machine: "2a424656-154b-41d4-8997-9508b51447b0",
        },
        {
          process: "ff774a8c-c409-4443-8da9-dab69c95743a",
          complete: false,
          machine: "19088b0e-e24e-43a0-a42f-950b6b30d733",
        },
        {
          process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          complete: false,
          machine: "",
        },
      ],
    },
    {
      id: "76512016-8752-478f-9d22-cd7db9c528d5",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "completed",
      process: [
        {
          process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          complete: false,
          machine: "",
        },
        {
          process: "ff774a8c-c409-4443-8da9-dab69c95743a",
          complete: false,
          machine: "",
        },
        {
          process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          complete: false,
          machine: "",
        },
      ],
    },
    {
      id: "8cc8dfcf-4a0f-43c0-b293-347a2383fab1",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "completed",
      process: [
        {
          process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          complete: true,
          machine: "2a424656-154b-41d4-8997-9508b51447b0",
        },
        {
          process: "ff774a8c-c409-4443-8da9-dab69c95743a",
          complete: true,
          machine: "",
        },
        {
          process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          complete: false,
          machine: "",
        },
      ],
    },
    {
      id: "476fa74a-a53e-45e7-a709-3faf54bf7702",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "completed",
      process: [
        {
          process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          complete: true,
          machine: "2a424656-154b-41d4-8997-9508b51447b0",
        },
        {
          process: "ff774a8c-c409-4443-8da9-dab69c95743a",
          complete: true,
          machine: "65fa0444-b884-48a5-a9ea-8fdb5b71be56",
        },
        {
          process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          complete: false,
          machine: "",
        },
      ],
    },
    {
      id: "700528dc-b0f9-4087-9838-167ded31f65f",
      productId: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
      status: "completed",
      process: [
        {
          process: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          complete: false,
          machine: "",
        },
        {
          process: "ff774a8c-c409-4443-8da9-dab69c95743a",
          complete: false,
          machine: "",
        },
        {
          process: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          complete: false,
          machine: "",
        },
      ],
    },
  ],
};

export default function (
  state = initialState,
  action: ProductionAction
): ProductionState {
  switch (action.type) {
    case ProductionConstants.ADD_SECTION:
      return {
        ...state,
        sections: [...state.sections, action.payload],
      };
    case ProductionConstants.DEL_SECTION:
      const sections = state.sections.filter(
        (section) => section.id != action.payload
      );
      return {
        ...state,
        sections,
      };
    case ProductionConstants.ADD_MACHINE:
      return {
        ...state,
        machines: [...state.machines, action.payload],
      };
    case ProductionConstants.DEL_MACHINE:
      const machines = state.machines.filter(
        (machine) => machine.id != action.payload
      );
      return {
        ...state,
        machines,
      };
    case ProductionConstants.START_PROCESS:
    case ProductionConstants.COMPLETE_PROCESS:
      const otherComponent = state.components.map((component) => {
        if (component.id == action.payload.id) {
          return action.payload;
        }
        return component;
      });

      return {
        ...state,
        components: otherComponent,
      };
    case ProductionConstants.ADD_COMPONENT:
      return {
        ...state,
        components: [...state.components, ...action.payload],
      };
    case ProductionConstants.HANDLE_PLANNING:
      const sectionPlanning = state.sections.map((section) => {
        if (section.id == action.payload.sectionId) {
          section.planning = action.payload.quantity;
        }
        return section;
      });

      return {
        ...state,
        sections: sectionPlanning,
      };
    default:
      return state;
  }
}
