import { z } from "zod";
import { shippingAddressSchema } from "./validations";

export type ShippingAddress = z.infer<typeof shippingAddressSchema>