namespace Web.Portal.Models.Shared
{
    public class PaginationModel
    {
        private const int MaksBarSize = 10;
        public int Size { get; set; }
        public int Total { get; set; }
        public int Count { get; set; }

        public int IndexStart { get; set; }

        public int BarSize { get; set; }
        public int Index { get; set; }

        public PaginationModel(int size, int total, int count)
        {
            Size = size;
            Total = total;
            Count = count;
        }

        public PaginationModel(int size, int total, int count, int index)
        {
            Size = size;
            Total = total;
            Count = count;
            IndexStart = index % MaksBarSize == 0 ? index - MaksBarSize + 1 : index / MaksBarSize * MaksBarSize + 1;
            BarSize = IndexStart + MaksBarSize - 1 <= Count ? MaksBarSize : Count % MaksBarSize; //maks bar size = 10
        }
    }
}
