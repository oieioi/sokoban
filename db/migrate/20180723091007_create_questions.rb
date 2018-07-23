class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.string :name, null: false, comment: 'title'
      t.string :description, null: true, comment: 'ヒント'
      t.string :map, null: false, comment: 'マップ'
      t.references :user, foreign_key: true, null: false, comment: '出題者'
      t.boolean :published, default: false, null: false, comment: '公開済みか'
      t.boolean :solved, default: false, null: false, comment: '解かれているか'
      t.string :answer, null: true, comment: '模範回答'

      t.timestamps
    end
  end
end
