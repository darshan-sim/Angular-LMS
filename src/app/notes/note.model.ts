export interface Note {
  id: string;
  title: string;
  createdAt: Date;
  note: string;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
