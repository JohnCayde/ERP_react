import * as engineer from "../actions/EngineerAction";
import { v4 as uuidv4 } from "uuid";
import * as EngineerConstant from "../constants/Engineer";
import * as EngineerTypes from "../types/Engineer";

const initialState: EngineerTypes.EngineerState = {
  products: [
    {
      id: "6d32582d-2db2-481b-89b4-7170d50de7b9",
      name: "Product A",
    },
    {
      id: "496ea0bd-5f67-4e1e-b2f2-173426fe876d",
      name: "Product B",
    },
    {
      id: "db108dc0-eb5d-4719-8e7a-c04e323d477a",
      name: "Product C",
    },
    {
      id: "47542649-19fa-4a72-baf1-b4c11668e4e1",
      name: "Product D",
    },
  ],
  processes: [
    {
      id: "34681fd9-5be7-461e-ad28-477b7df31135",
      name: "Casting",
    },
    {
      id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      name: "Cutting",
    },
    {
      id: "ff774a8c-c409-4443-8da9-dab69c95743a",
      name: "Treatment",
    },
    {
      id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
      name: "Finishing",
    },
  ],
  materials: [
    {
      id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      name: "Material A",
    },
    {
      id: "ff774a8c-c409-4443-8da9-dab69c95743a",
      name: "Material B",
    },
    {
      id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
      name: "Material C",
    },
    {
      id: "f4c5f3f4-6357-4804-ae84-1beb83d66441",
      name: "Material D",
    },
  ],
  procedures: [
    {
      id: "8459bab1-6eca-4bde-b65b-51fd39b263f9",
      name: "Product A",
      material: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      processes: [
        {
          id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          code: "8446271d-d547-4e2e-97bf-54901701057b",
        },
        {
          id: "ff774a8c-c409-4443-8da9-dab69c95743a",
          code: "65926677-af5f-46b2-b81c-d6c28b288c3b",
        },
        {
          id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          code: "1e737fc4-f892-48cc-bc0c-91e5bf0cb2ae",
        },
      ],
    },
    {
      id: "81ca9ba4-3313-4acb-92be-f5cd1892e5a3",
      name: "Product B",
      material: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      processes: [
        {
          id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          code: "3f38ffb3-5f51-497e-bccf-26f7e5b43479",
        },
        {
          id: "ff774a8c-c409-4443-8da9-dab69c95743a",
          code: "28e0a4d1-2b95-46e7-892f-38a76f08da2d",
        },
        {
          id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          code: "35fec818-dd21-410d-9283-12d15cf3b429",
        },
      ],
    },
    {
      id: "9f939a53-5b3d-4ac0-af79-f3bd23731044",
      name: "Product C",
      material: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      processes: [
        {
          id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          code: "ed9c30a1-f2cc-483b-8fa7-ba53a7c83440",
        },
        {
          id: "ff774a8c-c409-4443-8da9-dab69c95743a",
          code: "4f5b9a89-f28e-4e4a-aab6-0493e8a0cc9e",
        },
        {
          id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          code: "115488f7-ad26-4689-9e0b-da9fb8e3c2bd",
        },
      ],
    },
    {
      id: "9b57ffb3-e7d0-44e7-b383-c9d2c632912b",
      name: "Product D",
      material: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
      processes: [
        {
          id: "225c0005-38ee-4ade-8a3d-a0bcee313b80",
          code: "effb4bdb-1b3f-40fc-a95e-e3d66e2faacf",
        },
        {
          id: "ff774a8c-c409-4443-8da9-dab69c95743a",
          code: "d96bfec8-7b2a-4df9-9747-bd0bf1367188",
        },
        {
          id: "a89d39fd-02e4-4527-8f4a-714c311bab5d",
          code: "658b8e96-1cd3-46d7-adb3-24b3462176bc",
        },
      ],
    },
  ],
};

export default function (
  state = initialState,
  action: EngineerTypes.EngineerAction
): EngineerTypes.EngineerState {
  switch (action.type) {
    case EngineerConstant.ADD_MATERIAL:
      return {
        ...state,
        materials: [...state.materials, action.payload],
      };
    case EngineerConstant.DEL_MATERIAL:
      const materials = state.materials.filter(
        (material) => material.id != action.payload
      );

      return {
        ...state,
        materials: materials,
      };
    case EngineerConstant.ADD_PROCESS:
      return {
        ...state,
        processes: [...state.processes, action.payload],
      };
    case EngineerConstant.DEL_PROCESS:
      const processes = state.processes.filter(
        (process) => process.id != action.payload
      );
      return {
        ...state,
        processes,
      };
    case EngineerConstant.ADD_PROCEDURE:
      return {
        ...state,
        procedures: [...state.procedures, action.payload],
        products: [
          ...state.products,
          { id: uuidv4(), name: action.payload.name },
        ],
      };
    case EngineerConstant.DEL_PROCEDURE:
      const deleted = state.procedures.find(
        (procedure) => procedure.id == action.payload
      );
      const products = state.products.filter(
        (product) => product.name != deleted!.name
      );
      const procedures = state.procedures.filter(
        (procedure) => procedure.id != action.payload
      );
      return {
        ...state,
        procedures,
        products,
      };
    default:
      return state;
  }
}
