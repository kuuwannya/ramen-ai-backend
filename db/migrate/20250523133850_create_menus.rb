class CreateMenus < ActiveRecord::Migration[8.0]
  def change
    create_table :menus do |t|
      t.string :name, null: false
      t.references :shop, null: false, foreign_key: true

      t.timestamps
    end
  end
end
