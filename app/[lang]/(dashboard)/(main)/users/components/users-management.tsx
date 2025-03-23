'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/use-toast';
import { Loader2, Plus, Shield, UserPlus } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import { useParams, useRouter } from 'next/navigation';
import { addAdmin } from '@/action/auth-action';

// Impor formulir validasi admin untuk modal pembuatan admin baru
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  createAdminSchema,
  CreateAdminInput,
} from '@/validation/auth-validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
  created_at?: string;
  image?: string;
};

export function UsersManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [newRole, setNewRole] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [createAdminDialogOpen, setCreateAdminDialogOpen] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [creatingAdmin, setCreatingAdmin] = useState(false);
  const params = useParams();
  const router = useRouter();
  const lang = (params?.lang as string) || 'id';

  // Form untuk pembuatan admin baru
  const adminForm = useForm<CreateAdminInput>({
    resolver: zodResolver(createAdminSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/user', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Gagal mendapatkan data pengguna');
      }

      const data = await response.json();
      setUsers(data.data || []);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat mengambil data pengguna',
        color: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const openChangeRoleDialog = (user: User) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setDialogOpen(true);
  };

  const handleRoleChange = async () => {
    if (!selectedUser || !newRole || newRole === selectedUser.role) {
      setDialogOpen(false);
      return;
    }

    setUpdating(true);
    try {
      const response = await fetch('/api/user/update-role', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: selectedUser.id,
          role: newRole,
        }),
      });

      if (!response.ok) {
        throw new Error('Gagal mengubah role pengguna');
      }

      const data = await response.json();

      // Update pengguna di state
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id ? { ...user, role: newRole } : user,
        ),
      );

      toast({
        title: 'Sukses',
        description: `Role pengguna ${selectedUser.name} berhasil diubah menjadi ${newRole}`,
      });
    } catch (error) {
      console.error('Error updating user role:', error);
      toast({
        title: 'Error',
        description: 'Terjadi kesalahan saat mengubah role pengguna',
        color: 'destructive',
      });
    } finally {
      setUpdating(false);
      setDialogOpen(false);
      setSelectedUser(null);
    }
  };

  // Menangani pembuatan admin baru langsung dari halaman ini
  const handleCreateAdmin = async (data: CreateAdminInput) => {
    setCreatingAdmin(true);
    try {
      // Menggunakan server action addAdmin
      const response = await addAdmin({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (response.status >= 400) {
        throw new Error(
          response.message || 'Terjadi kesalahan saat membuat admin',
        );
      }

      toast({
        title: 'Sukses',
        description: 'Akun admin baru berhasil dibuat',
      });

      // Refresh daftar pengguna
      fetchUsers();

      // Reset form dan tutup dialog
      adminForm.reset();
      setCreateAdminDialogOpen(false);
    } catch (error: any) {
      console.error('Error creating admin:', error);
      toast({
        title: 'Error',
        description: error.message || 'Terjadi kesalahan saat membuat admin',
        color: 'destructive',
      });
    } finally {
      setCreatingAdmin(false);
    }
  };

  // Mengarahkan ke halaman registrasi admin terpisah
  const navigateToRegisterAdmin = () => {
    router.push(`/${lang}/auth/register-admin`);
  };

  // Membuka dialog pembuatan admin baru
  const openCreateAdminDialog = () => {
    adminForm.reset();
    setCreateAdminDialogOpen(true);
  };

  return (
    <div className='space-y-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-xl font-semibold'>Daftar Pengguna</h2>
        <Button
          onClick={openCreateAdminDialog}
          className='flex items-center gap-2'
        >
          <UserPlus className='h-4 w-4' />
          Buat Admin Baru
        </Button>
      </div>

      <div className='rounded-md border'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Tanggal Dibuat</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} className='py-8 text-center'>
                  <div className='flex justify-center'>
                    <Loader2 className='h-8 w-8 animate-spin text-primary' />
                  </div>
                  <p className='mt-2 text-sm text-muted-foreground'>
                    Memuat data pengguna...
                  </p>
                </TableCell>
              </TableRow>
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className='py-8 text-center'>
                  <p className='text-muted-foreground'>
                    Tidak ada data pengguna
                  </p>
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge
                      color={user.role === 'ADMIN' ? 'default' : 'secondary'}
                    >
                      {user.role === 'ADMIN' && (
                        <Shield className='mr-1 h-3 w-3' />
                      )}
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.created_at
                      ? formatDate(new Date(user.created_at))
                      : '-'}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => openChangeRoleDialog(user)}
                    >
                      Ubah Role
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Dialog untuk mengubah role pengguna */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Ubah Role Pengguna</DialogTitle>
            <DialogDescription>
              Ubah role untuk pengguna {selectedUser?.name}.
            </DialogDescription>
          </DialogHeader>

          <div className='py-4'>
            <label htmlFor='role' className='mb-2 block text-sm font-medium'>
              Role
            </label>
            <Select
              value={newRole}
              onValueChange={setNewRole}
              disabled={updating}
            >
              <SelectTrigger id='role'>
                <SelectValue placeholder='Pilih role' />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value='USER'>USER</SelectItem>
                <SelectItem value='ADMIN'>ADMIN</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setDialogOpen(false)}
              disabled={updating}
            >
              Batal
            </Button>
            <Button
              onClick={handleRoleChange}
              disabled={updating || newRole === selectedUser?.role}
            >
              {updating ? (
                <>
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                  Menyimpan...
                </>
              ) : (
                'Simpan'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog untuk membuat admin baru */}
      <Dialog
        open={createAdminDialogOpen}
        onOpenChange={setCreateAdminDialogOpen}
      >
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Buat Admin Baru</DialogTitle>
            <DialogDescription>
              Buat akun admin baru dengan akses penuh ke sistem.
            </DialogDescription>
          </DialogHeader>

          <Form {...adminForm}>
            <form
              onSubmit={adminForm.handleSubmit(handleCreateAdmin)}
              className='space-y-4 pt-4'
            >
              <FormField
                control={adminForm.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan nama lengkap'
                        disabled={creatingAdmin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={adminForm.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan email'
                        type='email'
                        disabled={creatingAdmin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={adminForm.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder='Masukkan password'
                        type='password'
                        disabled={creatingAdmin}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter className='pt-4'>
                <Button
                  variant='outline'
                  onClick={() => setCreateAdminDialogOpen(false)}
                  disabled={creatingAdmin}
                  type='button'
                >
                  Batal
                </Button>
                <Button type='submit' disabled={creatingAdmin}>
                  {creatingAdmin ? (
                    <>
                      <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                      Membuat...
                    </>
                  ) : (
                    'Buat Admin'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
