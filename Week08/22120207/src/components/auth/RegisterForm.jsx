import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "@/context/AuthContext";

export const RegisterForm = () => {
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema: Yup.object({
      name: Yup.string().max(50, "Họ và tên không quá 50 ký tự"),
      username: Yup.string()
        .required("Vui lòng nhập tên đăng ký")
        .matches(/^\S+$/, "Tên đăng nhập không được chứa khoảng trắng"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Vui lòng nhập email"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Vui lòng nhập mật khẩu"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Mật khẩu xác nhận không khớp.")
        .required("Vui lòng xác nhận mật khẩu.")
        .matches(/^\S+$/, "Mật khẩu không được chứa khoảng trắng"),
    }),

    onSubmit: (values) => {
      register(values);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign Up</CardTitle>
        <CardDescription>Create a new account to get started.</CardDescription>
      </CardHeader>
      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <CardContent className="space-y-2">
          <div className="space-y-1">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              placeholder="Họ tên của bạn"
              {...formik.getFieldProps("name")}
              className={
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : ""
              }
            />
            {/* Error Message */}
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              placeholder="Tên đăng nhập của bạn"
              {...formik.getFieldProps("username")}
              className={
                formik.touched.username && formik.errors.username
                  ? "border-red-500"
                  : ""
              }
            />
            {/* Error Message */}
            {formik.touched.username && formik.errors.username && (
              <p className="text-sm text-red-500">{formik.errors.username}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="nva@example.com"
              {...formik.getFieldProps("email")}
              className={
                formik.touched.email && formik.errors.email
                  ? "border-red-500"
                  : ""
              }
            />
            {/* Error Message */}
            {formik.touched.email && formik.errors.email && (
              <p className="text-sm text-red-500">{formik.errors.email}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              placeholder="Mật khẩu"
              type="password"
              {...formik.getFieldProps("password")}
              className={
                formik.touched.password && formik.errors.password
                  ? "border-red-500"
                  : ""
              }
            />
            {/* Error Message */}
            {formik.touched.password && formik.errors.password && (
              <p className="text-sm text-red-500">{formik.errors.password}</p>
            )}
          </div>
          <div className="space-y-1">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              placeholder="Xác nhận mật khẩu"
              type="password"
              {...formik.getFieldProps("confirmPassword")}
              className={
                formik.touched.confirmPassword && formik.errors.confirmPassword
                  ? "border-red-500"
                  : ""
              }
            />
            {/* Error Message */}
            {formik.touched.confirmPassword &&
              formik.errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {formik.errors.confirmPassword}
                </p>
              )}
          </div>
        </CardContent>

        <CardFooter className={"mt-5"}>
          <Button className="w-full">Create Account</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
