import { useQuery } from "@tanstack/react-query";
import MobileLayout from "@/components/layout/mobile-layout";
import { formatCurrency } from "@/lib/currency";
import { useStore } from "@/hooks/useStore";
import { Link } from "wouter";
import type { DashboardStats } from "@shared/schema";
import { TrendingUp, Receipt, Clock, AlertTriangle, Plus, Eye, FileText, Calculator, Package2, BarChart3, NotebookPen } from "lucide-react";

export default function Dashboard() {
  const { activeStoreId } = useStore();
  
  const { data: stats, isLoading } = useQuery<DashboardStats>({
    queryKey: [`/api/stores/${activeStoreId}/dashboard`],
    enabled: !!activeStoreId,
  });

  if (isLoading) {
    return (
      <MobileLayout currentPage="dashboard">
        <div className="p-4">
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-card rounded-lg p-4 border shadow-sm animate-pulse">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-8 bg-muted rounded mb-1"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </MobileLayout>
    );
  }

  return (
    <MobileLayout currentPage="dashboard">
      <div className="p-4">
        {/* Quick Stats Cards */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Omzet Hari Ini</h3>
              <TrendingUp className="w-4 h-4 text-success" />
            </div>
            <p className="text-2xl font-bold text-success" data-testid="text-daily-sales">
              {formatCurrency(stats?.dailySales || 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">+15% dari kemarin</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Transaksi</h3>
              <Receipt className="w-4 h-4 text-primary" />
            </div>
            <p className="text-2xl font-bold" data-testid="text-transaction-count">
              {stats?.transactionCount || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Transaksi hari ini</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Piutang</h3>
              <Clock className="w-4 h-4 text-warning" />
            </div>
            <p className="text-2xl font-bold text-warning" data-testid="text-total-debt">
              {formatCurrency(stats?.totalDebt || 0)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">12 pelanggan</p>
          </div>
          
          <div className="bg-card rounded-lg p-4 border shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-muted-foreground">Stok Kritis</h3>
              <AlertTriangle className="w-4 h-4 text-destructive" />
            </div>
            <p className="text-2xl font-bold text-destructive" data-testid="text-low-stock">
              {stats?.lowStockCount || 0}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Produk perlu restock</p>
          </div>
        </div>

        {/* Feature Menu */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3 flex items-center">
            <span className="mr-2">Fitur Andalan Kamu</span>
            <span className="text-lg">👌</span>
          </h3>
          <div className="grid grid-cols-5 gap-3">
            <Link href="/customers">
              <a className="flex flex-col items-center space-y-2 p-3 hover:bg-accent rounded-lg transition-colors" data-testid="button-debt-record">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <NotebookPen className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-center font-medium">Catat Utang</span>
              </a>
            </Link>
            
            <Link href="/cashflow">
              <a className="flex flex-col items-center space-y-2 p-3 hover:bg-accent rounded-lg transition-colors" data-testid="button-bookkeeping">
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-yellow-600" />
                </div>
                <span className="text-xs text-center font-medium">Catat Pembukuan</span>
              </a>
            </Link>
            
            <Link href="/pos">
              <a className="flex flex-col items-center space-y-2 p-3 hover:bg-accent rounded-lg transition-colors" data-testid="button-cashier-mode">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-center font-medium">Mode Kasir</span>
              </a>
            </Link>
            
            <Link href="/products">
              <a className="flex flex-col items-center space-y-2 p-3 hover:bg-accent rounded-lg transition-colors" data-testid="button-manage-stock">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Package2 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-center font-medium">Kelola Stok</span>
              </a>
            </Link>
            
            <Link href="/reports">
              <a className="flex flex-col items-center space-y-2 p-3 hover:bg-accent rounded-lg transition-colors" data-testid="button-business-reports">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs text-center font-medium">Laporan Usaha</span>
              </a>
            </Link>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold">Transaksi Terakhir</h3>
            <Link href="/reports">
              <a className="text-primary text-sm font-medium" data-testid="link-view-all-transactions">
                Lihat Semua
              </a>
            </Link>
          </div>
          
          <div className="space-y-3">
            {stats?.recentTransactions?.slice(0, 3).map((transaction: any) => (
              <div key={transaction.id} className="bg-card rounded-lg p-3 border flex items-center justify-between" data-testid={`transaction-${transaction.id}`}>
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    transaction.paymentStatus === 'paid' 
                      ? 'bg-success/10' 
                      : 'bg-warning/10'
                  }`}>
                    {transaction.paymentStatus === 'paid' ? (
                      <TrendingUp className="w-5 h-5 text-success" />
                    ) : (
                      <Clock className="w-5 h-5 text-warning" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.invoiceNumber}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(transaction.createdAt).toLocaleTimeString('id-ID', { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{formatCurrency(parseFloat(transaction.total))}</p>
                  <p className={`text-xs ${
                    transaction.paymentStatus === 'paid' 
                      ? 'text-success' 
                      : 'text-warning'
                  }`}>
                    {transaction.paymentMethod || 'Belum Bayar'}
                  </p>
                </div>
              </div>
            ))}
            
            {(!stats?.recentTransactions || stats.recentTransactions.length === 0) && (
              <div className="text-center py-8">
                <Receipt className="w-16 h-16 text-muted-foreground mb-4 mx-auto" />
                <p className="text-muted-foreground">Belum ada transaksi hari ini</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </MobileLayout>
  );
}
