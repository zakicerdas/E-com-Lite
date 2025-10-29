import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../hooks/useAuth";

const MAX_AVATAR_SIZE = 2 * 1024 * 1024;

const loginSchema = z.object({
  username: z.string().min(1, "Username wajib diisi"),
  password: z.string().min(6, "Password minimal 6 karakter"),
  avatar: z
    .any()
    .optional()
    .refine((fileList) => {
      if (!fileList) return true;
      if (fileList instanceof FileList) {
        if (fileList.length === 0) return true;
        const file = fileList[0];
        return file.size <= MAX_AVATAR_SIZE && /^image\/.*/.test(file.type);
      }
      return true;
    }, "Avatar harus berupa gambar (≤ 2MB)"),
});

type LoginFormValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname ?? "/dashboard";

  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const avatarFileList = watch("avatar");

  useEffect(() => {
    if (avatarFileList && avatarFileList.length > 0) {
      const file: File = avatarFileList[0];
      const reader = new FileReader();
      reader.onload = () => setPreview(reader.result as string);
      reader.onerror = () => setPreview(null);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  }, [avatarFileList]);

  const onSubmit = async (data: LoginFormValues) => {
    let avatarDataUrl: string | undefined;
    if (data.avatar && data.avatar.length > 0) {
      const file: File = data.avatar[0];
      avatarDataUrl = await fileToDataUrl(file);
    }


    login({ username: data.username.trim(), avatar: avatarDataUrl, password: data.password });

    navigate(from, { replace: true });
  };

  return (
    <div className="max-w-md mx-auto mt-12 bg-white/5 p-6 rounded-lg border-slate-700">
      <h2 className="text-2xl font-semibold mb-4">Login</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
        <div>
          <label className="block mb-1 text-sm">Username</label>
          <input {...register("username")} className="w-full px-3 py-2 rounded bg-slate-800" placeholder="Masukkan username" />
          {errors.username && <p className="text-sm text-red-400 mt-1">{errors.username.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">Password</label>
          <input type="password" {...register("password")} className="w-full px-3 py-2 rounded" placeholder="Minimal 6 karakter" />
          {errors.password && <p className="text-sm text-red-400 mt-1">{errors.password.message}</p>}
        </div>

        <div>
          <label className="block mb-1 text-sm">Avatar (opsional)</label>
          <input type="file" accept="image/*" {...register("avatar")} />
          {errors.avatar && <p className="text-sm text-red-400 mt-1">{errors.avatar.message as string}</p>}
        </div>

        {preview && (
          <div className="mt-2">
            <p className="text-sm mb-1">Preview:</p>
            <img src={preview} alt="avatar preview" className="w-24 h-24 rounded-full object-cover border" />
          </div>
        )}

        <div className="flex items-center justify-end gap-2">
          <button type="submit" disabled={isSubmitting} className="px-4 py-2 bg-blue-600 rounded">
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </div>
      </form>
    </div>
  );
};

function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => {
      reader.abort();
      reject(new Error("Gagal membaca file"));
    };
    reader.onload = () => resolve(reader.result as string);
    reader.readAsDataURL(file);
  });
}

export default Login;
