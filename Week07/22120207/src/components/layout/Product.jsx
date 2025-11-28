import React, { useState } from "react";
import { Star, CircleChevronLeft, CircleChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card";
import data from "../../data/data";
import { formatPrice } from "@/helpers/string";

const Product = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const totalItems = data.products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = data.products.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="w-full bg-[#f4f8ff] p-6">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Sản phẩm nổi bật</h1>
        <p className="text-sm text-slate-500 mt-1">
          Đang hiển thị trang {currentPage}/{totalPages} - mỗi trang{" "}
          {itemsPerPage} sản phẩm, dữ liệu từ data.js.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {currentProducts.map((product) => (
          <Card
            key={product.id}
            className="bg-white shadow-sm border-slate-200 overflow-hidden flex flex-col"
          >
            <div className="p-6 pb-2 relative">
              <div className="flex justify-between items-start mb-4">
                <CardTitle
                  className="text-base font-bold truncate pr-2 w-3/4"
                  title={product.title}
                >
                  {product.title}
                </CardTitle>
                {/* If rating >= 4.5, show Hot */}
                {product.rating.rate >= 4.5 && (
                  <span className="bg-orange-500 text-white text-[10px] font-bold px-2 py-1 rounded-full">
                    Hot
                  </span>
                )}
              </div>

              {/* Placeholder for Image */}
              <div className="w-full h-32 bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xl font-medium">
                300 x 150
              </div>
            </div>

            <CardContent className="space-y-3 pb-2 flex-1">
              <p
                className="text-sm text-slate-500 line-clamp-2 leading-relaxed"
                title={product.description}
              >
                {product.description}
              </p>

              <div className="font-bold text-xl text-slate-900">
                {formatPrice(product.price)}
              </div>

              {/* Rating Star */}
              <div className="flex items-center gap-1 text-sm text-slate-500">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span>
                  {product.rating.rate} - {product.rating.count} đánh giá
                </span>
              </div>
            </CardContent>

            <CardFooter className="flex justify-between items-center pt-2">
              <span className="text-xs text-slate-500">
                Rating count: <br /> {product.rating.count}
              </span>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white rounded-full px-6 hover:cursor-pointer select-none">
                Xem chi tiết
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 select-none">
          {/* Previous Button */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <CircleChevronLeft className="w-5 h-5" />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 flex items-center justify-center rounded-md text-sm font-medium transition
                ${
                  currentPage === page
                    ? "bg-slate-100 text-slate-900 shadow-sm border border-slate-200 pointer-events-none"
                    : "text-slate-600 hover:bg-slate-200"
                }`}
            >
              {page}
            </button>
          ))}

          {/* Next Button */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full hover:bg-slate-200 text-slate-600 transition disabled:opacity-50 disabled:hover:bg-transparent"
          >
            <CircleChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Product;
