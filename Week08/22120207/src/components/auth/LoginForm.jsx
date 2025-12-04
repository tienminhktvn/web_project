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

export const LoginForm = () => {
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },

    validationSchema: Yup.object({
      username: Yup.string()
        .required("Vui lòng nhập tên đăng nhập")
        .matches(/^\S+$/, "Tên đăng nhập không được chứa khoảng trắng"),
      password: Yup.string()
        .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
        .required("Vui lòng nhập mật khẩu")
        .matches(/^\S+$/, "Mật khẩu không được chứa khoảng trắng"),
    }),

    onSubmit: (values) => {
      login(values);
    },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Enter your credentials to access your account.
        </CardDescription>
      </CardHeader>

      <form onSubmit={formik.handleSubmit} className="space-y-2">
        <CardContent className="space-y-2">
          {/* USERNAME FIELD */}
          <div className="space-y-2">
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

          {/* PASSWORD FIELD */}
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type="password"
              placeholder="Mật khẩu"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
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
        </CardContent>

        <CardFooter className={"mt-5"}>
          <Button className="w-full">Login</Button>
        </CardFooter>
      </form>
    </Card>
  );
};
