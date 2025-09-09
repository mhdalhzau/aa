import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { formatCurrency } from "@/lib/currency";
import { useStore } from "@/hooks/useStore";

interface ReceiptItem {
  productName: string;
  quantity: number;
  price: number;
}

interface ReceiptData {
  storeId: string;
  storeName: string;
  storePhone: string;
  storeAddress: string;
  invoiceNumber: string;
  customerName?: string;
  items: ReceiptItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  paymentMethod: string;
  notes?: string;
  customContent?: string;
  date: Date;
}

interface ReceiptGeneratorProps {
  receiptData: ReceiptData;
  onClose: () => void;
}

export default function ReceiptGenerator({ receiptData, onClose }: ReceiptGeneratorProps) {
  const [customContent, setCustomContent] = useState(receiptData.customContent || "");
  const [customAddress, setCustomAddress] = useState(receiptData.storeAddress || "");
  const [customPhone, setCustomPhone] = useState(receiptData.storePhone || "");
  const { activeStore } = useStore();

  const handlePrint = () => {
    window.print();
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
      {/* Header */}
      <div className="sticky top-0 bg-primary text-primary-foreground p-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <button onClick={onClose} className="p-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-semibold">Pengaturan Nota</h1>
        </div>
        <Button onClick={handlePrint} className="bg-white text-primary hover:bg-gray-100">
          Cetak
        </Button>
      </div>

      {/* Receipt Preview */}
      <div className="p-4">
        <div className="max-w-sm mx-auto bg-white border rounded-lg p-4 print:shadow-none print:border-none">
          {/* Store Header */}
          <div className="text-center mb-4">
            <h2 className="text-lg font-bold uppercase">{receiptData.storeName}</h2>
            <p className="text-sm text-gray-600">{customPhone}</p>
          </div>

          {/* Transaction Info */}
          <div className="border-t border-b border-dashed py-2 mb-3">
            <div className="flex justify-between text-sm">
              <span>{formatDate(receiptData.date)}</span>
              <span className="text-blue-600">Lunas</span>
            </div>
            <div className="text-sm">
              <span>INV: {receiptData.invoiceNumber}</span>
            </div>
          </div>

          {/* Customer */}
          {receiptData.customerName && (
            <div className="mb-3">
              <div className="text-sm">
                <span className="text-gray-600">Pelanggan:</span>
              </div>
            </div>
          )}

          {/* Items */}
          <div className="mb-4">
            <div className="grid grid-cols-3 gap-2 text-xs font-medium border-b pb-1 mb-2">
              <span>Barang</span>
              <span className="text-center">Jumlah</span>
              <span className="text-right">Total</span>
            </div>
            {receiptData.items.map((item, index) => (
              <div key={index} className="grid grid-cols-3 gap-2 text-sm mb-1">
                <span className="truncate">{item.productName}</span>
                <span className="text-center">{item.quantity}</span>
                <span className="text-right">{formatCurrency(item.price * item.quantity)}</span>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="border-t border-dashed pt-2 mb-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Total Pembayaran</span>
              <span className="font-bold">Rp{receiptData.total.toLocaleString('id-ID')}</span>
            </div>
            <div className="text-xs text-gray-600">
              <span>Catatan:</span>
            </div>
          </div>

          {/* Footer/Branding */}
          <div className="text-center text-xs text-gray-500 mb-4">
            <div className="flex items-center justify-center mb-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center text-white font-bold text-xs mr-2">
                BW
              </div>
              <span>Dibuat pakai aplikasi BukuWarung</span>
            </div>
            <p>www.bukuwarung.com</p>
          </div>

          {/* Custom Content Section */}
          <div className="border-t pt-4">
            <h3 className="text-sm font-medium mb-2">Pengaturan Konten</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 border border-dashed rounded flex items-center justify-center">
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <span className="text-sm text-gray-600">Upload logo</span>
              </div>

              <div className="space-y-2">
                <Input
                  placeholder="Isi alamat usaha"
                  value={customAddress}
                  onChange={(e) => setCustomAddress(e.target.value)}
                  className="text-sm"
                />
                <Input
                  placeholder={customPhone}
                  value={customPhone}
                  onChange={(e) => setCustomPhone(e.target.value)}
                  className="text-sm"
                />
              </div>

              <div>
                <h4 className="text-sm font-medium mb-2 flex items-center">
                  Pengaturan Logo Nota
                  <div className="w-4 h-4 bg-blue-500 rounded-full ml-2 flex items-center justify-center">
                    <span className="text-white text-xs">!</span>
                  </div>
                </h4>
                <p className="text-xs text-gray-600 mb-2">
                  Logo nota kamu sedang aktif
                </p>
                <p className="text-xs text-blue-600">
                  Mau pake fitur ini? Yuk, selesaikan misi dan dapatkan nota eksklusif tanpa logo BukuWarung.{" "}
                  <span className="underline">Lihat misi</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="max-w-sm mx-auto mt-4">
          <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" onClick={onClose}>
            Simpan
          </Button>
        </div>
      </div>
    </div>
  );
}