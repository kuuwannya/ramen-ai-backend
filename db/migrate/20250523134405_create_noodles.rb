class CreateNoodles < ActiveRecord::Migration[8.0]
  def change
    create_table :noodles do |t|
      t.string :name, null: false

      t.timestamps
      t.index :name, unique: true
    end
  end
end
