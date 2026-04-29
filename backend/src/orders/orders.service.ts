import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { AppException } from '../common/exceptions';
import {
  parentMap,
  studentMap,
  menuItemMap,
  orders
} from '../common/utils/dummy-data';
@Injectable()
export class OrdersService {
  createOrder(studentId: string, items: any[]) {
    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new AppException(
        "EMPTY_ITEMS",
        "Please select only one item per order"
      );
    }
    const student = studentMap.get(studentId);
    if (!student)
      throw new AppException(
        "STUDENT_NOT_FOUND",
        `Student with ID '${studentId}' not found`
      );

    const parent = parentMap.get(student.parentId);
    if (!parent)
      throw new AppException(
        "PARENT_NOT_FOUND",
        `Parent account not found for student '${studentId}'`
      );

    let total = 0;

    for (const item of items) {
      const menuItem = menuItemMap.get(item.menuItemId);

      if (!menuItem)
        throw new AppException(
          "ITEM_NOT_FOUND",
          `Menu item '${item.menuItemId}' does not exist`
        );

      if (!menuItem.available)
        throw new AppException(
          "ITEM_UNAVAILABLE",
          `Menu item '${menuItem.name}' is currently unavailable`
        );

      const hasAllergen = menuItem.allergens.some(a =>
        student.allergens.includes(a)
      );

      if (hasAllergen)
        throw new AppException(
          "ALLERGEN_CONFLICT",
          `Cannot order '${menuItem.name}' due to allergen restriction`
        );

      total += menuItem.price * item.quantity;
    }
    if (parent.walletBalance < total)
      throw new AppException("INSUFFICIENT_BALANCE", "Insufficient balance");
    const order = {
      id: uuidv4(),
      studentId,
      items,
      total,
      status: "PENDING"
    };
    orders.push(order);
    try {
      parent.walletBalance -= total;
      order.status = "CONFIRMED";
    } catch (err) {
      order.status = "FAILED";
    }
    return order;
  }
  getAllData() {
    return {
      parents: Array.from(parentMap.values()),
      students: Array.from(studentMap.values()),
      menuItems: Array.from(menuItemMap.values()),
      orders
    };
  }
}