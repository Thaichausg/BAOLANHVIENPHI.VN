import { z } from "zod";

export const leadFormSchema = z.object({
  name: z
    .string()
    .min(2, "Vui lòng nhập họ tên (ít nhất 2 ký tự)")
    .max(100, "Họ tên quá dài"),
  phone: z
    .string()
    .regex(
      /^(0|\+84)(3[2-9]|5[2689]|7[06-9]|8[1-9]|9[0-9])\d{7}$/,
      "Số điện thoại không hợp lệ (VD: 0901234567)"
    ),
  wantClaimGuide: z.boolean().default(false),
});

export type LeadFormData = z.input<typeof leadFormSchema>;

export const calculatorFormSchema = z.object({
  age: z.number().min(0, "Tuổi phải từ 0").max(65, "Tuổi tối đa 65"),
  gender: z.enum(["male", "female"]),
  people: z.number().min(1, "Ít nhất 1 người").max(10, "Tối đa 10 người"),
  region: z.enum(["hcm", "hn", "other"]),
  plan: z.enum(["basic", "advanced"]),
});

export type CalculatorFormData = z.infer<typeof calculatorFormSchema>;
