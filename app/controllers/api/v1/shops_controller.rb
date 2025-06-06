module Api
  module V1
    class ShopsController < BaseController
      before_action :set_shop, only: [:show, :update, :destroy]

      def index
        pagy, shops = pagy(Shop.all)
        shop_list = ApiEntity::ShopList.new(shops:)
        pagy_headers_merge(pagy)
        render json: shop_list, status: :ok
      end

      def show
        render json: ApiEntity::Shop.new(shop: @shop), status: :ok
      end

      def create
        @shop = Shop.new(shop_params)

        if @shop.save
          render json: ApiEntity::Shop.new(shop: @shop), status: :created, location: api_v1_shop_url(@shop)
        else
          render json: @shop.errors, status: :unprocessable_entity
        end
      end

      def update
        if @shop.update(shop_params)
          render json: ApiEntity::Shop.new(shop: @shop), status: :ok
        else
          render json: @shop.errors, status: :unprocessable_entity
        end
      end

      def destroy
        @shop.destroy
        head :no_content
      end

      private

      def set_shop
        @shop = Shop.find(params[:id])
      end

      def shop_params
        params.expect(shop: [:name])
      end
    end
  end
end
