//Users
export const createUserSchema = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          type: "string",
          errorMessage: {
            type: "name deve ser do tipo string",
          },
        },
        email: {
          type: "string",
          errorMessage: {
            type: "email deve ser do tipo string",
          },
        },
        password: {
          type: "string",
          errorMessage: {
            type: "password deve ser do tipo string",
          },
        },
      },
      additionalProperties: false,
      errorMessage: {
        type: "body é obrigatório e é do tipo objeto",
        required: {
          name: "name é do tipo obrigatório",
          email: "email é do tipo obrigatório",
          password: "password é do tipo obrigatório",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          result: { type: "string" },
          code: { type: "number" },
          message: { type: "string" },
          method: { type: "number" },
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string" },
              active: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};

export const listUserByIdSchema = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          type: "string",
          errorMessage: {
            type: "name deve ser do tipo string",
          },
        },
        email: {
          type: "string",
          errorMessage: {
            type: "email deve ser do tipo string",
          },
        },
        password: {
          type: "string",
          errorMessage: {
            type: "password deve ser do tipo string",
          },
        },
      },
      additionalProperties: false,
      errorMessage: {
        type: "body é obrigatório e é do tipo objeto",
        required: {
          name: "name é do tipo obrigatório",
          email: "email é do tipo obrigatório",
          password: "password é do tipo obrigatório",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          result: { type: "string" },
          code: { type: "number" },
          message: { type: "string" },
          method: { type: "number" },
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string" },
              active: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};

export const listAllUsersSchema = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          type: "string",
          errorMessage: {
            type: "name deve ser do tipo string",
          },
        },
        email: {
          type: "string",
          errorMessage: {
            type: "email deve ser do tipo string",
          },
        },
        password: {
          type: "string",
          errorMessage: {
            type: "password deve ser do tipo string",
          },
        },
      },
      additionalProperties: false,
      errorMessage: {
        type: "body é obrigatório e é do tipo objeto",
        required: {
          name: "name é do tipo obrigatório",
          email: "email é do tipo obrigatório",
          password: "password é do tipo obrigatório",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          result: { type: "string" },
          code: { type: "number" },
          message: { type: "string" },
          method: { type: "number" },
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string" },
              active: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};

export const updateUserSchema = {
  schema: {
    body: {
      type: "object",
      required: ["name", "email", "password"],
      properties: {
        name: {
          type: "string",
          errorMessage: {
            type: "name deve ser do tipo string",
          },
        },
        email: {
          type: "string",
          errorMessage: {
            type: "email deve ser do tipo string",
          },
        },
        password: {
          type: "string",
          errorMessage: {
            type: "password deve ser do tipo string",
          },
        },
      },
      additionalProperties: false,
      errorMessage: {
        type: "body é obrigatório e é do tipo objeto",
        required: {
          name: "name é do tipo obrigatório",
          email: "email é do tipo obrigatório",
          password: "password é do tipo obrigatório",
        },
      },
    },
    response: {
      201: {
        type: "object",
        properties: {
          statusCode: { type: "number" },
          result: { type: "string" },
          code: { type: "number" },
          message: { type: "string" },
          method: { type: "number" },
          data: {
            type: "object",
            properties: {
              id: { type: "string" },
              email: { type: "string" },
              name: { type: "string" },
              created_at: { type: "string" },
              active: { type: "boolean" },
            },
          },
        },
      },
    },
  },
};
